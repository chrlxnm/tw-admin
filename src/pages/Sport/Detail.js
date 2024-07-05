import React from "react";
import { useParams } from "react-router-dom";

const DetailSportClass = () => {
  const { id } = useParams();
  return <div>DetailSportClass {id}</div>;
};

export default DetailSportClass;
