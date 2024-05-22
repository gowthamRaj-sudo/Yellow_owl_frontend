import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import ModalComponent from './ModalComponent';
import ConfirmationModal from './ConfirmationModal';

interface Heading {
  id:
    | 'student_name'
    | 'email'
    | 'phone'
    | 'enroll_number'
    | 'date_of_admission'
    | 'action';
  label: string;
  minWidth?: number;
  align?: 'center';
  format?: (value: any, row?: any) => any;
  image?: any;
}

interface tableProps {
  rows?: any;
  query?: any;
  setQuery?: any;
  onSubmit?: any;
  open?: any;
  onClose?: any;
  handleAction?: any;
  confirmationModel?: any;
  setConfirmationModalOpen?: any;
  searchQuery?: any;
}
const TableComponent = ({
  rows,
  query,
  setQuery,
  onSubmit,
  open,
  onClose,
  handleAction,
  confirmationModel,
  setConfirmationModalOpen,
  searchQuery,
}: tableProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const visibleColumns =
    isSmallScreen || isExtraSmallScreen
      ? ['student_name', 'email', 'action']
      : [
          'student_name',
          'email',
          'phone',
          'enroll_number',
          'date_of_admission',
          'action',
        ];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const heading: readonly Heading[] = [
    {
      id: 'student_name',
      label: 'NAME',
      minWidth: 170,
      format: (value) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src='https://cdn.iconscout.com/icon/free/png-512/free-avatar-370-456322.png?f=webp&w=256'
            width={30}
            height={30}
          />
          <div style={{ paddingLeft: '12px' }}> {value}</div>
        </div>
      ),
    },
    { id: 'email', label: 'EMAIL', minWidth: 100 },
    {
      id: 'phone',
      label: 'PHONE',
      minWidth: 170,
      format: (value) => value,
    },
    {
      id: 'enroll_number',
      label: 'ENROLL NUMBER',
      minWidth: 170,
      format: (value) => value,
    },
    {
      id: 'date_of_admission',
      label: 'DATE OF ADMISSION',
      minWidth: 170,
      format: (value) => value,
    },
    {
      id: 'action',
      label: 'ACTION',
      minWidth: 100,
      format: (value, row) => (
        <>
          <div>
            <Grid container spacing={2}>
              <Grid item lg={3}>
                <FaEdit
                  color='#2563EB'
                  style={{ cursor: 'pointer' }}
                  size={17}
                  onClick={() => {
                    onClose(true);
                    setQuery(row);
                  }}
                />
              </Grid>

              <Grid item lg={3}>
                <RiDeleteBin5Line
                  color='#DC2626'
                  style={{ cursor: 'pointer' }}
                  size={17}
                  onClick={() => {
                    setConfirmationModalOpen(true);
                    setQuery(row);
                  }}
                />
              </Grid>
            </Grid>
          </div>
        </>
      ),
    },
  ];

  const filteredRows = rows?.filter((row: any) => {
    const searchString =
      `${row.name} ${row.email} ${row.phone} ${row.enroll_number} ${row.date_of_admission}`.toLowerCase();
    return searchString?.includes(searchQuery.toLowerCase());
  });
  return (
    <Paper
      sx={{
        width: '100%',
        overflow: 'hidden',
        borderRadius: '6px',
      }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {heading
                .filter((column) => visibleColumns.includes(column.id))
                .map((column) => (
                  <TableCell
                    sx={{
                      background: '#F9FAFB',
                      color: '#6B7280',
                      fontWeight: '700',
                    }}
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows?.length <= 0 ? (
              <TableRow>
                <TableCell
                  colSpan={heading?.length}
                  align='center'
                  sx={{ fontSize: '18px', fontWeight: 800 }}
                >
                  No data found !
                </TableCell>
              </TableRow>
            ) : (
              filteredRows
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row: any) => {
                  return (
                    <TableRow
                      hover
                      role='checkbox'
                      tabIndex={-1}
                      key={row.email}
                    >
                      {heading
                        .filter((column) => visibleColumns.includes(column.id))
                        .map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format
                                ? column.format(value, row)
                                : value}
                            </TableCell>
                          );
                        })}
                    </TableRow>
                  );
                })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <ModalComponent
        title='Edit Student'
        open={open}
        onClose={() => onClose(false)}
        btnValue='Update'
        closeValue='Cancel'
        query={query}
        setQuery={setQuery}
        onSubmit={onSubmit}
      />
      <ConfirmationModal
        open={confirmationModel}
        onClose={() => setConfirmationModalOpen(false)}
        onSubmit={() => handleAction(query.id)}
      />
    </Paper>
  );
};

export default TableComponent;
