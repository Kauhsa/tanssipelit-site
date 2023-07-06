import React from "react";

class EmailLink extends React.Component {
  state = {
    client: false,
  };

  componentDidMount() {
    this.setState({ client: true });
  }

  render() {
    const { prefix, suffix = "", children } = this.props;
    const { client } = this.state;

    let address;

    // attempt at obfuscating emails
    if (client) {
      address = `${prefix}@tanssipelit.fi`;
    } else {
      address = `${prefix}POISTA at tanssipelit.fi`;
    }

    return <a href={`mailto:${address}${suffix}`}>{children || address}</a>;
  }
}

export default EmailLink;
