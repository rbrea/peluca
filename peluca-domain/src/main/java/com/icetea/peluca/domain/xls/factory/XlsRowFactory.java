package com.icetea.peluca.domain.xls.factory;

import static org.slf4j.LoggerFactory.getLogger;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.ss.formula.eval.NotImplementedException;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellValue;
import org.apache.poi.ss.usermodel.FormulaEvaluator;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Workbook;
import org.slf4j.Logger;

import com.icetea.peluca.domain.utils.NumberUtils;
import com.icetea.peluca.domain.xls.ColumnMapable;
import com.icetea.peluca.domain.xls.XlsMapToColumnAnnotationProcessor;

@Named
public class XlsRowFactory {
	
	private static final Logger LOGGER = getLogger(XlsRowFactory.class);

    private final XlsMapToColumnAnnotationProcessor xlsMapToColumnAnnotationProcessor;

    @Inject
    public XlsRowFactory(XlsMapToColumnAnnotationProcessor xlsMapToColumnAnnotationProcessor) {
        super();
        this.xlsMapToColumnAnnotationProcessor = xlsMapToColumnAnnotationProcessor;
    }

    public <T extends ColumnMapable> T create(final Row row, final Workbook workbook, T columnMapable) {
        if (row == null) {
            return null;
        }
        if (this.isEmptyRow(row)) {
            return null;
        }
        for (int i = row.getFirstCellNum(); i < row.getLastCellNum(); i++) {
            String value = this.getCellValue(row.getCell(i), workbook);

            this.xlsMapToColumnAnnotationProcessor.process(columnMapable, value, i);
        }
        return columnMapable;
    }

    public boolean isEmptyRow(Row row) {
        if (row == null || row.getPhysicalNumberOfCells() == 0) {
            return true;
        } else {
            for (short c = row.getFirstCellNum(); c <= row.getLastCellNum(); c++) {
                if (row.getCell(c) != null && row.getCell(c).getCellType() != Cell.CELL_TYPE_BLANK) {
                    return false;
                }
            }
        }
        return true;
    }


    protected String getStringFromDate(Cell cell, Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");

        return sdf.format(date);
    }

    protected String convertToString(BigDecimal numericValue) {
        return NumberUtils.toString(numericValue).replace(",00", StringUtils.EMPTY).replace(".00", StringUtils.EMPTY);
    }

    protected String getNumberCellValue(Cell cell) {
        if (HSSFDateUtil.isCellDateFormatted(cell)) {
            Date date = HSSFDateUtil.getJavaDate(cell.getNumericCellValue());
            return this.getStringFromDate(cell, date);
        } else {
            BigDecimal numericValue = BigDecimal.valueOf(cell.getNumericCellValue());
            return this.convertToString(numericValue);
        }
    }

    protected String getCellValue(final Cell cell, final Workbook workbook) {
        if (cell == null) {
            return null;
        }
        if (cell.getCellType() == Cell.CELL_TYPE_NUMERIC) {
            return this.getNumberCellValue(cell);
        } else if (cell.getCellType() == Cell.CELL_TYPE_FORMULA) {
            FormulaEvaluator evaluator = workbook.getCreationHelper().createFormulaEvaluator();
            try {
                CellValue cellValue = evaluator.evaluate(cell);
                switch (cellValue.getCellType()) {
                case Cell.CELL_TYPE_BOOLEAN:
                    return Boolean.toString(cellValue.getBooleanValue());
                case Cell.CELL_TYPE_NUMERIC:
                    return this.getNumberCellValue(cell);
                case Cell.CELL_TYPE_STRING:
                    return cellValue.getStringValue();
                case Cell.CELL_TYPE_BLANK:
                    return StringUtils.EMPTY;
                case Cell.CELL_TYPE_ERROR:
                    return Byte.toString(cellValue.getErrorValue());
                // CELL_TYPE_FORMULA will never happen
                case Cell.CELL_TYPE_FORMULA:
                    throw new IllegalArgumentException("Not supported cell value: \"" + cell + "\"");
                default:
                    return null;
                }
            } catch (NotImplementedException e) {
                LOGGER.error("unhandled notImplementedException", e);
                throw new IllegalArgumentException("Not supported Formula: \"" + cell + "\"", e);
            }
        } else {
            // We set this because otherwise getting the value as string
            // will throw an error if the cell type is numeric or other
            cell.setCellType(Cell.CELL_TYPE_STRING);
            return cell.getRichStringCellValue().getString().trim();
        }
    }

}
