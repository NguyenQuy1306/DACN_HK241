package com.curcus.lms.util;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

public class TableAvailableSorter {
    public void sortTableAvailableList(List<Map<String, Object>> tableAvailableList) {
        tableAvailableList.sort(Comparator
                .comparing((Map<String, Object> map) -> (LocalDate) map.get("ngay"))
                .thenComparing(map -> (LocalTime) map.get("gio")));
    }
}
