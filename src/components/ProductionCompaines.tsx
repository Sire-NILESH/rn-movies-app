import React from "react";
import { IProductionCompany } from "../../types/typings";
import { useNavigation } from "@react-navigation/native";
import CompanyLogoBuilder from "./builders/CompanyLogoBuilder";

interface IProps {
  productions: IProductionCompany[];
}

const ProductionCompaines: React.FC<IProps> = (props) => {
  return (
    <>
      <CompanyLogoBuilder company={props.productions} mediaType="movie" />
    </>
  );
};

export default ProductionCompaines;
