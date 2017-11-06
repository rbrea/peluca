package com.icetea.peluca.domain.xls;

import static org.slf4j.LoggerFactory.getLogger;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;

import com.google.common.collect.Lists;
import com.icetea.peluca.domain.xls.factory.XlsRowFactory;

public abstract class AbstractExcelProcessor<T extends ColumnMapable> {

	@SuppressWarnings("unused")
    private static final Logger LOGGER = getLogger(AbstractExcelProcessor.class);

    private final XlsRowFactory xlsRowFactory;

    public AbstractExcelProcessor(XlsRowFactory xlsRowFactory) {
        super();
        this.xlsRowFactory = xlsRowFactory;
    }

    protected Workbook getWorkbook(String filename, InputStream is) throws IOException {
        if (StringUtils.endsWithIgnoreCase(filename, ".xls")) {
            return new HSSFWorkbook(is);
        } else if (StringUtils.endsWithIgnoreCase(filename, ".xlsx")) {
            return new XSSFWorkbook(is);
        }
        throw new IllegalArgumentException(
            String.format("File: %s doesn't have a valid format. This must be .xls or .xlsx", filename));
    }

    public List<T> process(String filename, InputStream is) {
        List<T> result = Lists.newArrayList();
        // Get the workbook instance for XLS file
        try {
            Workbook workbook = this.getWorkbook(filename, is);
            // Get first sheet from the workbook
            Sheet sheet = this.getVisibleSheetAt(workbook, 0);

            if (sheet == null) {
                throw new ExcelException("A valid sheet was not found on file.");
            }
            boolean flag = true;
            for (Row row : sheet) {
                if (flag) {
                    // [roher] si estoy en la prim row la salteo,, es la cabecera,, no me interesa ...
                    flag = false;
                    continue;
                }
                T r = this.xlsRowFactory.create(row, workbook, this.createColumnMapable());
                if (r == null) {
                    // si r es null, significa que ya termine de leer todas las filas con datos ...
                    break;
                }
                result.add(r);
            }

        } catch (IOException e) {
            throw new ExcelException("Ha ocurrido un error al tratar de leer el archivo .xls", e);
        }

        return result;
    }
    
    protected abstract T createColumnMapable();

    private Sheet getVisibleSheetAt(Workbook workbook, Integer sheetIndex) {
        int visibleSheetNumber = -1;
        for (int i = 0; i < workbook.getNumberOfSheets(); i++) {
            if (!workbook.isSheetHidden(i) && !workbook.isSheetVeryHidden(i)) {
                visibleSheetNumber++;
            }
            if (visibleSheetNumber == sheetIndex) {
                return workbook.getSheetAt(i);
            }
        }
        return null;
    }

}
