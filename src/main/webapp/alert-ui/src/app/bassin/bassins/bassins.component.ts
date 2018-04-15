import {Component, OnInit, ViewChild} from "@angular/core";
import {Bassin} from "../bassin";
import {BassinService} from "../bassin.service";
import {MatTableDataSource, MatPaginator} from "@angular/material";
import {BassinMapService} from "../bassin-map.service";
import {FeatureOverlayService} from "../../ngeo/feature-overlay/feature-overlay.service";
import VectorLayer from "ol/layer/vector.js";
import Map from "ol/map.js";

@Component({
  selector: 'app-bassin',
  templateUrl: './bassins.component.html',
  styleUrls: ['./bassins.component.scss']
})
export class BassinComponent implements OnInit {

  bassins: Bassin[];
  map: Map;
  private featureOverlay: VectorLayer;

  constructor(
    private bassinMapService: BassinMapService,
    private foService: FeatureOverlayService,
    private bassinService: BassinService
  ) { }

  ngOnInit() {
    this.getBassins();
    this.map = this.bassinMapService.initMap();
    this.featureOverlay = this.foService.getFeatureOverlay(this.map);
  }

  displayedColumns: string[] = ['maj_name', 'sub_name'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  getBassins(): void {
    this.bassinService.getBassins()
      .subscribe(bassins => {
        this.bassins = bassins
        this.dataSource = new MatTableDataSource(this.bassins);
        this.dataSource.paginator = this.paginator;
        this.setFeatures();
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  private setFeatures(): void {
    this.bassins.forEach( bassin => {
      this.bassinMapService.setFeature(bassin, this.featureOverlay, this.map);
    });
    const extent = this.featureOverlay.getSource().getExtent();
    const view = this.map.getView();
    view.fit(extent);
  }

}
