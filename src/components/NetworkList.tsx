import React from "react";
import { Network } from "../../types/typings";
import CompanyLogoBuilder from "./builders/CompanyLogoBuilder";

interface IProps {
  networks: Network[];
}

const NetworkList: React.FC<IProps> = (props) => {
  return (
    <>
      <CompanyLogoBuilder company={props.networks} mediaType="tv" />
    </>
  );
};

export default NetworkList;
