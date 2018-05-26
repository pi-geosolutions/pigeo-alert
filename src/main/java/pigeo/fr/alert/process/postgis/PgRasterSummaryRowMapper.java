package pigeo.fr.alert.process.postgis;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class PgRasterSummaryRowMapper implements RowMapper
{
    public PgRasterSummary mapRow(ResultSet rs, int rowNum) throws SQLException {

        PgRasterSummary summary = new PgRasterSummary();
        summary.setName(rs.getString("name"));
        summary.setId(rs.getLong("id"));
        summary.setSum(rs.getDouble("sum"));
        summary.setMax(rs.getDouble("max"));
        summary.setMean(rs.getDouble("mean"));
        return summary;
    }

}