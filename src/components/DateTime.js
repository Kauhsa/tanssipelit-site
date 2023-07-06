import React from "react";
import styled from "styled-components";
import { FormattedDate } from "react-intl";

function DateTime({
  dateTime,
  options = { day: "numeric", month: "numeric", year: "numeric" },
  className,
}) {
  return (
    <time className={className} dateTime={dateTime}>
      <FormattedDate value={dateTime} {...options} />
    </time>
  );
}

export default styled(DateTime)``;
