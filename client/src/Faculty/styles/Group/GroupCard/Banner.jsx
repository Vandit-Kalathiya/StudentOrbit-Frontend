// eslint-disable-next-line no-unused-vars
import React from "react";
import { Card, Flex, Typography } from "antd";
import Button from "../../../../Styles/Button";
import { Link } from "react-router-dom";

function Banner({ title, description, technologies, batch, projectName, groupLeader, members, category, progress }) {
  return (
    <Card className="md:h-260 md:p-5">
      <Flex vertical gap="30px">
        <Flex vertical align="flex-start">
          <Typography strong className="text-xl md:text-3xl font-bold">
            {title}
          </Typography>
          <Typography type="secondary" strong className="mt-2">
            {description}
          </Typography>

          <div className="flex flex-wrap gap-2 mt-4">
            {technologies.map((tech, index) => (
              <Typography.Text
                key={index}
                className="rounded-full border-2 border-[#8693f5] py-1 px-4 hover:bg-[#5B6DF3] hover:text-white"
              >
                {tech}
              </Typography.Text>
            ))}
          </div>
          <div className="mt-4">
            <Typography.Text strong className="text-base">
              Group Leader : 
            </Typography.Text>
            <Typography.Text className="text-base ml-2">
              {groupLeader}
            </Typography.Text>
          </div>

        </Flex>
        <div className="flex md:gap-10 md:flex-row flex-col items-center gap-6">
          <Link
            to={`/f/dashboard/batches/${batch}/${projectName}`}
            state={{
              title,
              description,
              groupLeader,
              members,
              category,
              technologies,
              progress, 
            }}
          >
            <Button text="Explore Innovations" />
          </Link>
        </div>
      </Flex>
    </Card>
  );
}

export default Banner;
