import React from "react";
import { IProductionCompany } from "../../types/typings";
import CompanyLogoBuilder from "./builders/CompanyLogoBuilder";

interface IProps {
  productions: IProductionCompany[];
  imgQuality?: string;
}

const ProductionCompaines: React.FC<IProps> = (props) => {
  return (
    <>
      <CompanyLogoBuilder
        company={props.productions}
        mediaType="movie"
        imgQuality={props.imgQuality}
      />
    </>
  );
};

export default ProductionCompaines;
