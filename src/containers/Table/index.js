import _ from "lodash";
import React, { Component } from "react";
import { Table, Image, Container, } from "semantic-ui-react";
import faker from "faker";
import Nav from "../../components/Nav/index";

const tableData = [];
for (let i = 0; i < 200; i++) {
  tableData[i] = {
    image: faker.image.avatar(),
    name: faker.name.findName(),
    phone: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    jobTitle: faker.name.jobTitle(),
  };
}

export default class TableExampleSortable extends Component {
  state = {
    value: "",
    column: null,
    direction: null,
    data: tableData,
  };

  handleSearchChange = event => {
    if (event.target.value.length < 1) return this.setState({ data: tableData });
    const filter = event.target.value;
    const dataList = this.state.data.filter(item => {
      let values = Object.values(item).join("").toLowerCase();
      return values.indexOf(filter.toLowerCase()) !== -1;
    });
    this.setState({ data: dataList });
  }

  handleSort = (clickedColumn) => () => {
    const { column, data, direction } = this.state;
    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: "ascending",
      });
      return;
    }
    this.setState({
      data: data.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending",
    });
  };

  render() {
    const { column, direction, data } = this.state;
    return (
      <Container>
        <Nav handleSearchChange={this.handleSearchChange} />
        <Table className="data-area" sortable celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Image</Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "name" ? direction : null}
                onClick={this.handleSort("name")}
              >
                Name
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "phone" ? direction : null}
                onClick={this.handleSort("phone")}
              >
                Phone
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "email" ? direction : null}
                onClick={this.handleSort("email")}
              >
                Email
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "jobTitle" ? direction : null}
                onClick={this.handleSort("jobTitle")}
              >
                jobTitle
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(data, ({ image, name, phone, email, jobTitle }) => (
              <Table.Row key={name}>
                <Image src={image} size="small" />
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell>{phone}</Table.Cell>
                <Table.Cell>{email}</Table.Cell>
                <Table.Cell>{jobTitle}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}
