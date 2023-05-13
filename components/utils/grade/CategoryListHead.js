import PropTypes from 'prop-types';
// material
import { visuallyHidden } from '@mui/utils';
import { Box, Checkbox, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';

// ----------------------------------------------------------------------

CategoryListHead.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.string,
  rowCount: PropTypes.number,
  headLabel: PropTypes.array,
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func
};

export default function CategoryListHead({
  order,
  orderBy,
  rowCount,
  headLabel,
  numSelected,
  onRequestSort,
  onSelectAllClick,
	mode,
}) {
  console.log("🚀 ~ file: CategoryListHead.js ~ line 28 ~ headLabel", headLabel)
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead
			sx={{
				bgcolor : '#003B5C',
				color : '#fff',
			}}
		>
      <TableRow
				sx={{
					bgcolor : '#003B5C',
					color : '#fff',
				}}
			>
        <TableCell padding="checkbox"
              sx={{
                minWidth: 50,
                // ...headCell.sx,
                // ...lastIndex,
                bgcolor: "#003B5C",
                color: "#fff",
              }}
        >
          {/* <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          /> */}
        </TableCell>
        {headLabel.map((headCell) => {
					if(headCell.id == 'confirm' && mode)
						return ""
					return (
          <TableCell
            key={headCell.id}
            align={headCell.center ? headCell.center : headCell.alignRight ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              minWidth: headCell.id === "" ? 50 : 100,
              ...headCell.sx,
              // ...lastIndex,
              bgcolor: "#003B5C",
              color: "#fff",
            }}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
							sx={{
								bgcolor : '#003B5C',
								color : '#fff',
								'&.Mui-active' : {
									color : '#E3A130',
								}
							}}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        )})}
      </TableRow>
    </TableHead>
  );
}
