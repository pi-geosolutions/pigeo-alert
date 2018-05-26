package pigeo.fr.alert.report.entity;

import pigeo.fr.alert.domain.Bassin;

/**
 * Created by florent on 25/04/18.
 */
public class BufferReportModel {

    private Long id;
    private String name;
    private String sum03;
    private String sum06;
    private int radius;
    private int threshold;

    public BufferReportModel() {}


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSum03() {
        return sum03;
    }

    public void setSum03(String sum03) {
        this.sum03 = sum03;
    }

    public String getSum06() {
        return sum06;
    }

    public void setSum06(String sum06) {
        this.sum06 = sum06;
    }

    public int getRadius() {
        return radius;
    }

    public void setRadius(int radius) {
        this.radius = radius;
    }

    public int getThreshold() {
        return threshold;
    }

    public void setThreshold(int threshold) {
        this.threshold = threshold;
    }
}
