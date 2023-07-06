import React from "react";
import styled from "styled-components";
import { injectIntl } from "react-intl";

function DateRange({
  start,
  end,
  intl,
  options = { day: "numeric", month: "numeric", year: "numeric" },
  className,
}) {
  const startString = intl.formatDate(start, options);
  const endString = end && intl.formatDate(end, options);
  const hasEnd = end && startString !== endString;

  return (
    <time className={className}>
      {startString}
      {hasEnd && ` – ${endString}`}
    </time>
  );
}

export default styled(injectIntl(DateRange))``;
