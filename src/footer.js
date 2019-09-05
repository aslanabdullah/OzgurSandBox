import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <footer id="footer" style={{ display: "block" }}>
        <span id="todo-count">
          <strong>{this.props.count}</strong> items left
        </span>
        <ul id="filters">
          <li>
            <a
              className={this.props.secici === "tumu" ? "selected" : ""}
              href="#/"
              onClick={() => this.props.setSecici("tumu")}
            >
              Tümü
            </a>
          </li>
          <li>
            <a
              className={this.props.secici === "aktif" ? "selected" : ""}
              href="#/"
              onClick={() => this.props.setSecici("aktif")}
            >
              Akitf
            </a>
          </li>
          <li>
            <a
              className={this.props.secici === "pasif" ? "selected" : ""}
              href="#/"
              onClick={() => this.props.setSecici("pasif")}
            >
              Pasif
            </a>
          </li>
        </ul>
      </footer>
    );
  }
}

export default Footer;
