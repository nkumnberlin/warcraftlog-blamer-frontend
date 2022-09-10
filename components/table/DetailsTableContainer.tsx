import React from 'react';
import {
  Table, Tbody, Th, Thead, Tr, TableContainer,
} from '@chakra-ui/react';

interface IDetailsTable {
  header: string[];
  children: React.ReactNode;
}

function DetailsTableContainer({ header, children }: IDetailsTable) {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            {header.map((head) => <Th>{head}</Th>)}
          </Tr>
        </Thead>
        <Tbody>
          {children}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default DetailsTableContainer;
