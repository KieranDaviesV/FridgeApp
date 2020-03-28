CREATE TABLE users(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL
);

CREATE TABLE recipes(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    recipe_name VARCHAR(20) NOT NULL,
    recipe_description VARCHAR(20) NOT NULL
);

CREATE TABLE userfollowing(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    follower_id BIGINT REFERENCES users(id),
    followee_id BIGINT REFERENCES users(id)
);
CREATE TABLE recipefollowing(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    follower_id BIGINT REFERENCES users(id),
    recipe_id BIGINT REFERENCES recipes(id)
);

INSERT INTO users(first_name, last_name) VALUES ('Kieran', 'Davies');
INSERT INTO users(first_name, last_name) VALUES ('Launa', 'Ord');
INSERT INTO users(first_name, last_name) VALUES ('Raf', 'Blaze');

INSERT INTO recipes(recipe_name, recipe_description) VALUES('food1', 'food1 food');
INSERT INTO recipes(recipe_name, recipe_description) VALUES('food2', 'food2 food');

INSERT INTO userfollowing(follower_id, followee_id) VALUES(1,2);
INSERT INTO userfollowing(follower_id, followee_id) VALUES(3,1);
INSERT INTO userfollowing(follower_id, followee_id) VALUES(2,1);

INSERT INTO recipefollowing(follower_id, recipe_id) VALUES(1,1);
INSERT INTO recipefollowing(follower_id, recipe_id) VALUES(2,1);

/* Gets the users which are following the ID you set */
 SELECT users.first_name FROM users JOIN userfollowing uf ON uf.follower_id=users.id WHERE uf.followee_id=1;

/* Gets any recipes that your followers have*/
 SELECT recipes.recipe_name FROM users JOIN userfollowing uf ON uf.follower_id=users.id JOIN recipefollowing rf ON rf.follower_id=users.id JOIN recipes ON recipes.id=rf.recipe_id WHERE uf.followee_id=1;