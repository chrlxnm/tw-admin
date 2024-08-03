import styled from "styled-components";

const getBgColor = ({ color }) => {
  switch (color?.toString()?.toLowerCase()) {
    case "approved":
      return "#E6F7EF";
    case "canceled":
      return "#FFD9D9";
    case "rejected":
      return "#FFD9D9";
    case "submitted":
      return "#E9F1FC";
    case "waiting":
      return "#E9E9E9";
    default:
      return "#E6F7EF";
  }
};

const getColor = ({ color }) => {
  switch (color?.toString()?.toLowerCase()) {
    case "approved":
      return "#00AA5B";
    case "active":
      return "#00AA5B";
    case "canceled":
      return "#FB2121";
    case "inactive":
      return "#FB2121";
    case "rejected":
      return "#FB2121";
    case "submitted":
      return "#246EE5";
    case "waiting":
      return "#7A7A7A";
    default:
      return "#00AA5B";
  }
};

export const BadgePrimary = styled.p`
  width: fit-content;
  height: fit-content;
  padding: 2px 4px 2px 4px;
  border-radius: 4px;
  color: ${getColor};
  background: ${getBgColor};
  font-size: 10px;
  font-weight: 600;
  text-transform: capitalize;
`;

export const BadgeSecondary = styled.p`
  width: fit-content;
  height: fit-content;
  padding: 2px 4px 2px 4px;
  border-radius: 4px;
  color: ${getColor};
  font-size: 10px;
  font-weight: 600;
  text-transform: capitalize;
`;
