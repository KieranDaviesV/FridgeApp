import { BarCodeScanner } from "expo-barcode-scanner";
import * as Permissions from "expo-permissions";
import React, { Component } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default class BarcodeScanner extends Component {
    public state = {
        hasCameraPermission: null,
        scanned: false
    };
    public async componentDidMount() {
        this.getPermissions();
    }
    public getPermissions = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === "granted" });

    }
    public render() {
        const { hasCameraPermission, scanned } = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return (<View
            style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "flex-end",
            }}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}

            />

            {
                scanned && (
                    <Button title={"Tap to Scan Again"} onPress={() => this.setState({ scanned: false })} />
                )
            }
        </View >
        );
    }

    public handleBarCodeScanned = ({ type, data }) => {
        this.setState({ scanned: true });
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    }
}
