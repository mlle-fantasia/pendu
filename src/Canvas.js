import React, {Component} from 'react';
import {Line, Layer, Text, Circle} from 'react-konva';
import './Canvas.css';


class Canvas extends Component {


    render() {


        let ligne1 = <Line
            points={[0, 250, 200, 250]}
            stroke={'gray'}
            strokeWidth={4}
        />;

        let ligne2 = <Line
            points={[10, 250, 10, 70]}
            stroke={'gray'}
            strokeWidth={4}
        />;
        let ligne3 = <Line
            points={[10, 100, 40, 70]}
            stroke={'gray'}
            strokeWidth={4}
        />;
        let ligne4 = <Line
            points={[10,70, 100, 70]}
            stroke={'gray'}
            strokeWidth={4}
        />;
        let ligne5 = <Line
            points={[100, 70, 100, 100]}
            stroke={'gray'}
            strokeWidth={4}
        />;
        let ligne6 = <Line
            points={[100, 120, 100, 170]}
            stroke={'gray'}
            strokeWidth={4}
        />;
        let ligne7 = <Line
            points={[100, 125, 80, 90]}
            stroke={'gray'}
            strokeWidth={4}
        />;
        let ligne8 = <Line
            points={[100, 125, 120, 90]}
            stroke={'gray'}
            strokeWidth={4}
        />;
        let ligne9 = <Line
            points={[100, 170, 90, 130]}
            stroke={'gray'}
            strokeWidth={4}
        />;
        let ligne10 = <Line
            points={[100, 170, 110, 130]}
            stroke={'gray'}
            strokeWidth={4}
        />;
        let tete = <Circle
            x={100}
            y={110}
            radius={10}
            stroke={'gray'}
            strokeWidth={4}
        />;

        const tabDessin = [
            {ligne: ligne1, id: 1, coupRestant: 10},
            {ligne: ligne2, id: 2, coupRestant: 9},
            {ligne: ligne3, id: 3, coupRestant: 8},
            {ligne: ligne4, id: 4, coupRestant: 7},
            {ligne: ligne5, id: 5, coupRestant: 6},
            {ligne: tete, id: 6, coupRestant: 5},
            {ligne: ligne6, id: 7, coupRestant: 4},
            {ligne: ligne7, id: 8, coupRestant: 3},
            {ligne: ligne8, id: 9, coupRestant: 2},
            {ligne: ligne9, id: 10, coupRestant: 1},
            {ligne: ligne10, id: 11, coupRestant: 0}
        ];

        let nbessaiRestant = this.props.essaiRestant;

        let tabdessin2 = tabDessin.filter(function (element) {
            return element.coupRestant >= nbessaiRestant ? element.ligne : false;

        });

        let dessin = tabdessin2.map(function (element) {
            return element.ligne;
        });

        return (
            <Layer>
                <Text text="nombre d'essais restant avant d'être pendu : " nb={nbessaiRestant}
                      fontSize = {18}
                      margin = {10}


                />
                {dessin.map((element) => (
                    element
                ))}
            </Layer>
        );
    }
}


export default Canvas;