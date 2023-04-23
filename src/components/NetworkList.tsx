import React from "react";
import { Network } from "../../types/typings";
import CompanyLogoBuilder from "./builders/CompanyLogoBuilder";

interface IProps {
  networks: Network[];
  imgQuality?: string;
}

const NetworkList: React.FC<IProps> = (props) => {
  return (
    <>
      <CompanyLogoBuilder
        company={props.networks}
        mediaType="tv"
        imgQuality={props.imgQuality}
      />
    </>
  );
};

export default NetworkList;
