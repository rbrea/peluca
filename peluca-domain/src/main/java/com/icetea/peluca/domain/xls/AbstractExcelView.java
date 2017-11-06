package com.icetea.peluca.domain.xls;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.web.servlet.view.document.AbstractXlsxView;

import com.icetea.peluca.api.dto.BasicIdentifiableDto;

public abstract class AbstractExcelView<T extends BasicIdentifiableDto> extends AbstractXlsxView {

	public static final String LIST_PARAM_NAME = "list";
	
	@SuppressWarnings("unchecked")
	@Override
	protected void buildExcelDocument(Map<String, Object> model, Workbook workbook, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
        Sheet excelSheet = workbook.createSheet();
        excelSheet.setDefaultColumnWidth(16);
        this.setExcelHeader(excelSheet);

        List<T> list = (List<T>) model.get(LIST_PARAM_NAME);
        this.setExcelRows(excelSheet, list);
	}
	
	protected abstract void setExcelRows(Sheet excelSheet, List<T> list);

	protected abstract void setExcelHeader(Sheet excelSheet);
	
}
