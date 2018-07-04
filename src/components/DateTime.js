import React from "react";
import styled from "styled-components";
import fiLocale from "date-fns/locale/fi";
import formatFn from "date-fns/format";

const DateTime = ({ dateTime, format = "D.M.YYYY", className }) => (
  <time className={className} dateTime={dateTime}>
    {formatFn(dateTime, format, { locale: fiLocale })}
  </time>
);

export default styled(DateTime)``;
