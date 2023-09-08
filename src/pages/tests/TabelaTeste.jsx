import { Chart } from "react-google-charts";
import React, { useEffect, useState } from "react";
import { Avatar, Tag, TagGroup } from "rsuite";

function TabelaTeste() {

  const [dados, setDados] = useState([])

  //   useEffect(() => {
  //     fetch(process.env.REACT_APP_GATEWAY_URL + "/venda/venda-por-categorias").then((res) => res.json()).then((res) => {
  //       setDados(res)
  //       console.log(res)
  //     })


  //  }, [])

  const dados2 = [
    {
      "idProduto": 3,
      "quantidade": 1,
      "tamanho": "AVULSO",
      "categorias": [
        "COPA DO MUNDO"
      ]
    },
    {
      "idProduto": 4,
      "quantidade": 3,
      "tamanho": "M,M,M",
      "categorias": [
        "JEANS",
        "LONG",
        "CAMISA",
        "CAMISA DE TIME",
        "NIKE"
      ]
    },
    {
      "idProduto": 53,
      "quantidade": 1,
      "tamanho": "AVULSO",
      "categorias": [
        "BERMUDA",
        "CALÇA",
        "JÓIA"
      ]
    },
    {
      "idProduto": 38,
      "quantidade": 5,
      "tamanho": "P,M,G,G,G",
      "categorias": [
        "CAMISA",
        "CALÇADO",
        "BERMUDA"
      ]
    },
    {
      "idProduto": 6,
      "quantidade": 3,
      "tamanho": "M,GG,GG",
      "categorias": [
        "BOLSA"
      ]
    },
    {
      "idProduto": 8,
      "quantidade": 2,
      "tamanho": "G,GG",
      "categorias": [
        "BERMUDA",
        "CAMISA DE TIME",
        "COPA DO MUNDO",
        "JEANS"
      ]
    },
    {
      "idProduto": 44,
      "quantidade": 1,
      "tamanho": "AVULSO",
      "categorias": [
        "ÓCULOS",
        "CASACO",
        "CALÇA",
        "CALÇADO"
      ]
    },
    {
      "idProduto": 28,
      "quantidade": 7,
      "tamanho": "GG,P,P,GG,GG,G,G",
      "categorias": [
        "CAMISA",
        "JEANS",
        "CALÇADO"
      ]
    },
    {
      "idProduto": 13,
      "quantidade": 1,
      "tamanho": "G",
      "categorias": [
        "CALÇADO",
        "BERMUDA"
      ]
    },
    {
      "idProduto": 30,
      "quantidade": 3,
      "tamanho": "T40,T40,T40",
      "categorias": [
        "BERMUDA",
        "CALÇA"
      ]
    }
  ]

  useEffect(() => {
    // let a = JSON.parse(dados2)
    // console.log(a)

    const contagemCategorias = {};

    // Preencha o objeto de contagem de categorias
    dados2.forEach((produto) => {
      produto.categorias.forEach((categoria) => {
        if (contagemCategorias[categoria]) {
          contagemCategorias[categoria]++;
        } else {
          contagemCategorias[categoria] = 1;
        }
      });
    });

    // Crie um array de arrays com os dados no formato desejado
    const dadosFormatados = [["Categoria", "Qtd"]];
    for (const categoria in contagemCategorias) {
      dadosFormatados.push([categoria, contagemCategorias[categoria]]);
    }

    setDados(dadosFormatados)
    console.log(dadosFormatados)

  }, [])

  const options = {
    title: "Categorias mais vendidas nos últimos 7 dias	",
    pieHole: 0.4,
    is3D: false,
  };

  const data = [
    ["Categoria", "Qtd","cor"],
    ["DINHEIRO", 0, '#2ecc71'],
    ["PIX", 2,'#3498db'],
    ["CARTÃO", 0,'#e74c3c']
  ]


  return (
    <>
      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={data}
        options={{
          title: "Formas de pagamento",
          is3D: false,
          // colors: ['#2ecc71', '#e74c3c', '#3498db'],
          legend: "para todos aqueles ",
          slices: {
            0: { color: 'green' },     // CARTAO em vermelho
            1: { color: 'blue' },    // PIX em azul
            2: { color: 'red' },   // DINHEIRO em verde
          }
        }}
      />
    </>
  );
}

export default TabelaTeste;