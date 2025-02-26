'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";



interface CryptoData  {
  [key: string]: {price: string, quantity: string, tradeId: string}
}


export default function Home() {
  const [data, setData] = useState<CryptoData>({
    btcusdt: { price: "Loading..." , quantity: 'Loading...', tradeId: 'Loading...'},
    ethusdt: { price: "Loading..." , quantity: 'Loading...', tradeId: 'Loading...'},
    bnbusdt: { price: "Loading..." , quantity: 'Loading...', tradeId: 'Loading...'},
    xrpusdt: { price: "Loading..." , quantity: 'Loading...', tradeId: 'Loading...'},
    solusdt: { price: "Loading..." , quantity: 'Loading...', tradeId: 'Loading...'},
    adausdt: { price: "Loading..." , quantity: 'Loading...', tradeId: 'Loading...'},
  });

  useEffect(() => {
    const ws = new WebSocket(
      "wss://stream.binance.com:9443/stream?streams=btcusdt@trade/ethusdt@trade/bnbusdt@trade/xrpusdt@trade/solusdt@trade/adausdt@trade"
    );

    ws.onmessage = (msg) => {
      try {
        const response = JSON.parse(msg.data);
        if (!response?.data?.s || !response?.data?.p) return;

        const symbol = response.data.s.toLowerCase();
        const price = response.data.p;
        const quantity = response.data.q;
        const tradeId = response.data.t;

        setData((prevData) => ({
          ...prevData,
          [symbol]: { price , quantity, tradeId },
        }));
      } catch (error) {
        console.error("Error parsing WebSocket data:", error);
      }
    };

    ws.onerror = (error) => console.error("WebSocket Error:", error);
    ws.onclose = () => console.log("WebSocket Closed");

    return () => ws.close();
  }, []);


  return (
    <div className="flex flex-col gap-3">
        {/* Home */}
      <div className="flex p-4 gap-4" id="home">
        <div className="w-1/2 flex items-center pl-6">
          <h1 className="text-8xl text-wrap font-sans my-12"><p className="text-blue-500">261,065,446</p>
            USERS 
            <p>TRUST US</p>
            </h1>
        </div>
        <div className="w-1/2 flex items-center flex-col gap-4 pt-16">
          <Card className="p-4 space-y-4">
            <CardTitle className="text-blue-500">Current News</CardTitle>
            <CardContent className="space-y-2">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam, adipisci!
              </p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi fugit vero cupiditate eveniet, nihil a?</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi fugit vero cupiditate eveniet, nihil a?</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi fugit vero cupiditate eveniet, nihil a?</p>
            </CardContent>
              <CardFooter>
                <Button>Read More</Button>
              </CardFooter>
          </Card>
        </div>
      </div>
      {/* Current Data */}
      <div className="px-6 ">
        <div>
          <Card className="p-4">
            <CardTitle className="text-blue-500 mb-2">Current Data</CardTitle>
            <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Coin</TableHead>
                  <TableHead>Price (USDT)</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Trade ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(data).map(([symbol, value]) => (
                  <TableRow key={symbol}>
                    <Link href={`/details/${symbol}`}><TableCell className="font-medium">{symbol.toUpperCase()}</TableCell></Link>
                    <TableCell>${parseFloat(value.price).toFixed(2)}</TableCell>
                    <TableCell>{parseFloat(value.quantity).toFixed(2)}</TableCell>
                    <TableCell>{parseFloat(value.tradeId).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
