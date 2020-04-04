
DROP TABLE users CASCADE;
CREATE TABLE users(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL
);
DROP TABLE recipes CASCADE;
CREATE TABLE recipes(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    recipe_name VARCHAR(20) NOT NULL,
    recipe_description VARCHAR(20) NOT NULL
);
DROP TABLE ingredients CASCADE;
CREATE TABLE ingredients(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    ingredient_name VARCHAR(25) NOT NULL,
    ingredient_weight INT NOT NULL
    CONSTRAINT ingredient_weight CHECK (ingredient_weight > 0)
);
DROP TABLE recipeingredients CASCADE;
CREATE TABLE recipeingredients(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    recipe_id BIGINT REFERENCES recipes(id) ON DELETE CASCADE,
    ingredient_id BIGINT REFERENCES ingredients(id) ON DELETE CASCADE,
    quantity FLOAT(2) NOT NULL
    CONSTRAINT quantity CHECK (quantity > 0)
);
DROP TABLE userfollowing;
CREATE TABLE userfollowing(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    follower_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    followee_id BIGINT REFERENCES users(id) ON DELETE CASCADE
);

DROP INDEX uf_follower_id;
CREATE INDEX uf_follower_id ON userfollowing(follower_id);

DROP INDEX uf_followee_id;
CREATE INDEX uf_followee_id ON userfollowing(followee_id);

DROP TABLE  recipefollowing;
CREATE TABLE recipefollowing(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    follower_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    recipe_id BIGINT REFERENCES recipes(id) ON DELETE CASCADE
);

/*  checks if its themself
    or if they are already following
*/
CREATE OR REPLACE FUNCTION check_user_follows()
RETURNS TRIGGER AS
$$
BEGIN
    IF NEW.followee_id = NEW.follower_id 
    THEN RAISE Exception 'You cannot follow yourself';
    ELSIF NEW.followee_id = (SELECT uf.followee_id FROM userfollowing uf
                                WHERE uf.followee_id=NEW.followee_id AND uf.follower_id=NEW.follower_id)
    THEN RAISE Exception 'You are already following this user';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE PLpgSQL;

DROP TRIGGER IF EXISTS check_user_follow ON userfollowing;

CREATE TRIGGER check_user_follow BEFORE INSERT ON userfollowing
FOR EACH ROW EXECUTE PROCEDURE check_user_follows();

/* Checks if the user is already following the recipe*/
CREATE OR REPLACE FUNCTION check_recipe_follows()
RETURNS TRIGGER AS 
$$
BEGIN
    IF NEW.recipe_id = (SELECT rf.recipe_id FROM recipefollowing rf WHERE rf.recipe_id=NEW.recipe_id AND rf.follower_id=NEW.follower_id)
    THEN RAISE Exception 'Already following recipe';
    END IF;
    RETURN NEW; 
END;
$$ LANGUAGE PLpgSQL;

DROP TRIGGER IF EXISTS check_recipe_follows ON recipefollowing;


CREATE TRIGGER check_recipe_follows BEFORE INSERT ON recipefollowing
FOR EACH ROW EXECUTE PROCEDURE check_recipe_follows();

INSERT INTO users(first_name, last_name) VALUES ('Kieran', 'Davies');
INSERT INTO users(first_name, last_name) VALUES ('Launa', 'Ord');
INSERT INTO users(first_name, last_name) VALUES ('Raf', 'Blaze');

INSERT INTO recipes(recipe_name, recipe_description) VALUES('food1', 'food1 food');
INSERT INTO recipes(recipe_name, recipe_description) VALUES('food2', 'food2 food');

INSERT INTO ingredients(ingredient_name, ingredient_weight) VALUES('tomato', 500);
INSERT INTO ingredients(ingredient_name, ingredient_weight) VALUES('pepper', 450);

INSERT INTO recipeingredients(recipe_id, ingredient_id,quantity) VALUES(1, 1, 1);
INSERT INTO recipeingredients(recipe_id, ingredient_id,quantity) VALUES(2, 2, 0.5);


INSERT INTO userfollowing(follower_id, followee_id) VALUES(1,2);
INSERT INTO userfollowing(follower_id, followee_id) VALUES(3,1);
INSERT INTO userfollowing(follower_id, followee_id) VALUES(2,1);
INSERT INTO userfollowing(follower_id, followee_id) VALUES(1,2);
INSERT INTO userfollowing(follower_id, followee_id) VALUES(1,1);
INSERT INTO userfollowing(follower_id, followee_id) VALUES(1,5);

INSERT INTO recipefollowing(follower_id, recipe_id) VALUES(1,1);
INSERT INTO recipefollowing(follower_id, recipe_id) VALUES(2,1);
INSERT INTO recipefollowing(follower_id, recipe_id) VALUES(1,1);
INSERT INTO recipefollowing(follower_id, recipe_id) VALUES(2,5);
INSERT INTO recipefollowing(follower_id, recipe_id) VALUES(5,1);

/* Gets the users which are following the ID you set */
 SELECT users.first_name FROM users JOIN userfollowing uf ON uf.follower_id=users.id WHERE uf.followee_id=1;

/* Gets any recipes that your followers have*/
 SELECT recipes.recipe_name FROM users JOIN userfollowing uf ON uf.follower_id=users.id JOIN recipefollowing rf ON rf.follower_id=users.id JOIN recipes ON recipes.id=rf.recipe_id WHERE uf.followee_id=1;

/* Gets a recipe and all its ingredients*/
 SELECT r.id , r.recipe_name, json_agg(ingredients) as ingredients FROM recipes r JOIN recipeingredients ri ON r.id=ri.recipe_id JOIN ingredients ON ingredients.id=ri.ingredient_id WHERE r.id=1 GROUP BY r.id;

/*Get recipe that includes this ingredient*/
 SELECT r.id, r.recipe_name FROM recipes r 
 JOIN recipeingredients ri ON r.id=ri.recipe_id 
 JOIN ingredients ON ingredients.id=ri.ingredient_id 
 WHERE ingredients.ingredient_name='tomato';

/*Search for the ingredients with multiple ingredients in them*/
SELECT r.id FROM recipes r 
INNER JOIN recipeingredients ri 
ON r.id=ri.recipe_id
INNER JOIN ingredients i 
ON ri.ingredient_id=i.id
AND i.ingredient_name IN ('tomato', 'pepper')
GROUP BY r.id
HAVING 
    COUNT(DISTINCT CASE 
            WHEN i.ingredient_name IN ('tomato', 'pepper') THEN i.ingredient_name
        END) = 2;