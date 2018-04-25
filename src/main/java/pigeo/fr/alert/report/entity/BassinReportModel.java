package pigeo.fr.alert.report.entity;

import pigeo.fr.alert.domain.Bassin;

/**
 * Created by florent on 25/04/18.
 */
public class BassinReportModel {

    private Long id;
    private String majname;
    private String subname;
    private String area;

    public BassinReportModel() {}

    public BassinReportModel(Bassin bassin) {
        this.id = bassin.getGid();
        this.majname = bassin.getMaj_name();
        this.subname = bassin.getSub_name();
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMajname() {
        return majname;
    }

    public void setMajname(String majname) {
        this.majname = majname;
    }

    public String getSubname() {
        return subname;
    }

    public void setSubname(String subname) {
        this.subname = subname;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }
}
