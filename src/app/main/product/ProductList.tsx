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
  proDesc?: string;
  proImg?: any;
};

const productList: ProductList[] = [
  {
    proId: 1,
    proName: "E Sim 1",
    proDesc: "Iphone 14",
    proImg: iphone14,
  },
  {
    proId: 2,
    proName: "E Sim 2",
    proDesc: "Samsung Galaxy G Fold 5",
    proImg: samsungFold,
  },
  {
    proId: 3,
    proName: "E Sim 3",
    proDesc: "Iphone 11",
    proImg: iphone11,
  },
  {
    proId: 4,
    proName: "E Sim 4",
    proDesc: "Iphone 12",
    proImg: iphone12,
  },
  {
    proId: 5,
    proName: "E Sim 5",
    proDesc: "Iphone 13",
    proImg: iphone13,
  },
  {
    proId: 6,
    proName: "E Sim 6",
    proDesc: "Samsung Z Flip",
    proImg: samsungFlip,
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
                className='text-center border border-gray-400 rounded-xl m-6 p-4'
                role='button'
                onClick={() => {
                  setIsModalOpen(true);
                  setId(product.proId);
                }}>
                <Card
                  hoverable
                  style={{ width: "100%", height: 350 }}
                  cover={
                    <Image
                      alt={product.proDesc}
                      src={product.proImg}
                      quality={100}
                      height={200}
                      className='w-full h-64'
                    />
                  }>
                  <Meta title={product.proName} description={product.proDesc} />
                </Card>
              </Col>
              <Modal
                title='Scan QR'
                open={isModalOpen}
                footer={false}
                centered
                width={300}
                onCancel={() => setIsModalOpen(false)}>
                {proData !== undefined ? (
                  <>
                    <QRCode
                      type='svg'
                      value={`product ${proData.proId}\nname: ${proData.proName}\ndescription: ${proData.proDesc}\nvendor_id: 1`}
                    />
                    <p>product id: {proData.proId}</p>
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
