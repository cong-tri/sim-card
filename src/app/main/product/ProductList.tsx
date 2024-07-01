/** @format */
"use client";
import React, { useState } from "react";
import { Col, Modal, Row, QRCode, Card } from "antd";
import Image from "next/image";
import iphone14 from "../../../../public/images/iphone14.webp";
import iphone11 from "../../../../public/images/iphone-11.jpg";
import iphone12 from "../../../../public/images/iphone-12.jpg";
import iphone13 from "../../../../public/images/iphone-13.webp";
import samsungFold from "../../../../public/images/samsung-galaxy-z-fold.jpg";
import samsungFlip from "../../../../public/images/samsung-z-flip.webp";

const { Meta } = Card;

type ProductList = {
  proId?: number;
  proName?: string;
  proImg?: any;
  proDesc?: string;
  proPrice?: number;
  proData?: string;
  proExpire?: string;
};

const productList: ProductList[] = [
  {
    proId: 1,
    proName: "E Sim 1",
    proDesc: "Iphone 14",
    proImg: iphone14,
    proPrice: 135000,
    proData: "5 GB / 1 day => 150GB",
    proExpire: "1 Month",
  },
  {
    proId: 2,
    proName: "E Sim 2",
    proDesc: "Samsung Galaxy G Fold 5",
    proImg: samsungFold,
    proPrice: 130000,
    proData: "5 GB / 1 day => 150GB",
    proExpire: "1 Month",
  },
  {
    proId: 3,
    proName: "E Sim 3",
    proDesc: "Iphone 11",
    proImg: iphone11,
    proPrice: 130000,
    proData: "5 GB / 1 day => 150GB",
    proExpire: "1 Month",
  },
  {
    proId: 4,
    proName: "E Sim 4",
    proDesc: "Iphone 12",
    proImg: iphone12,
    proPrice: 130000,
    proData: "5 GB / 1 day => 150GB",
    proExpire: "1 Month",
  },
  {
    proId: 5,
    proName: "E Sim 5",
    proDesc: "Iphone 13",
    proImg: iphone13,
    proPrice: 130000,
    proData: "5 GB / 1 day => 150GB",
    proExpire: "1 Month",
  },
  {
    proId: 6,
    proName: "E Sim 6",
    proDesc: "Samsung Z Flip",
    proImg: samsungFlip,
    proPrice: 130000,
    proData: "5 GB / 1 day => 150GB",
    proExpire: "1 Month",
  },
];

export default function ProductList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [id, setId] = useState(0);

  const proData: any = productList.find(({ proId }) => {
    return proId === (id ? id : null);
  });

  return (
    <>
      <Row align={"middle"} justify={"center"}>
        {productList.map((product: any, index: any) => {
          return (
            <>
              <Col
                key={index}
                span={6}
                className="text-center border border-gray-400 rounded-xl m-6 p-4"
                role="button"
                onClick={() => {
                  setIsModalOpen(true);
                  setId(product.proId);
                }}
              >
                <Card
                  hoverable
                  style={{ width: "100%", height: 350 }}
                  cover={
                    <Image
                      alt={product.proDesc}
                      src={product.proImg}
                      quality={100}
                      height={200}
                      className="w-full h-64"
                    />
                  }
                >
                  <Meta
                    title={product.proName}
                    description={
                      <>
                        <p>{product.proDesc}</p>
                        {/* <p>{product.proPrice}đ</p>
                        <p>DATA: {product.proData}</p>
                        <p>Expire: {product.proExpire}</p> */}
                      </>
                    }
                  />
                </Card>
              </Col>
              <Modal
                title="Scan QR"
                open={isModalOpen}
                footer={false}
                centered
                width={500}
                onCancel={() => setIsModalOpen(false)}
              >
                {proData !== undefined ? (
                  <>
                    <Row>
                      <Col span={10}>
                        <QRCode
                          type="svg"
                          value={`product ${proData.proId}\nname: ${proData.proName}\ndescription: ${proData.proDesc}\nprice: ${proData.proPrice}d\ndata: ${proData.proData}\nexpire: ${proData.proExpire}\nvendor_id: 1`}
                        />
                      </Col>
                      <Col span={14}>
                        <p>Information:</p>
                        <p>product id: {proData.proId}</p>
                        <p>product name: {proData.proName}</p>
                        <p>product desc: {proData.proDesc}</p>
                        <p>product price: {proData.proPrice}d</p>
                        <p>product data: {proData.proData}</p>
                        <p>product expire: {proData.proExpire}</p>
                      </Col>
                    </Row>
                  </>
                ) : (
                  ""
                )}
              </Modal>
            </>
          );
        })}
      </Row>
    </>
  );
}
