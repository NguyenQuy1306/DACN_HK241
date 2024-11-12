package com.capstoneproject.themeal.model.entity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Objects;

public class DateTimeKey {
    private LocalDate ngay;
    private LocalTime gio;

    public DateTimeKey(LocalDate ngay, LocalTime gio) {
        this.ngay = ngay;
        this.gio = gio;
    }

    public LocalDate getNgay() {
        return ngay;
    }

    public LocalTime getGio() {
        return gio;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        DateTimeKey that = (DateTimeKey) o;
        return Objects.equals(ngay, that.ngay) && Objects.equals(gio, that.gio);
    }

    @Override
    public int hashCode() {
        return Objects.hash(ngay, gio);
    }
}
