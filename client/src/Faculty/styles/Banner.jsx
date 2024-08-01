// eslint-disable-next-line no-unused-vars
import React from "react";
import { Card, Flex, Typography } from "antd";
import Button from "../../Styles/Button";
import ButtonOutline from "../../Styles/ButtonOutline";

function Banner() {
  return (
    <Card className="md:h-260 md:p-10">
      <Flex vertical gap="30px">
        <Flex vertical align="flex-start">
          <Typography
            strong
            className="text-xl md:text-3xl font-bold"
          >
            Create and sell products
          </Typography>
          <Typography type="secondary" strong className="mt-2">
            Lorem ipsum dolor sit, amet consectetur adipisicing.
          </Typography>
        </Flex>
        <div className="flex md:gap-10 md:flex-row flex-col items-center gap-6">
          <Button text="Explore More" />
          <ButtonOutline text="Top Sellers" />
        </div>
      </Flex>
    </Card>
  );
}

export default Banner;
