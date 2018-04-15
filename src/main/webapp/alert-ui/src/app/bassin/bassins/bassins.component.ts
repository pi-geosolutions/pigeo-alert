import {Component, OnInit, ViewChild} from "@angular/core";
import {Router} from '@angular/router';
import {Bassin} from "../bassin";
import {BassinService} from "../bassin.service";
import {MatTableDataSource, MatPaginator} from "@angular/material";
import {BassinMapService} from "../bassin-map.service";
import {FeatureOverlayService} from "../../ngeo/feature-overlay/feature-overlay.service";
import VectorLayer from "ol/layer/vector.js";
import Select from "ol/interaction/select.js";
import condition from "ol/events/condition.js";
import Collection from "ol/collection.js";
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
  private selection: Collection;

  constructor(
    private bassinMapService: BassinMapService,
    private foService: FeatureOverlayService,
    private bassinService: BassinService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getBassins();
    this.map = this.bassinMapService.initMap();
    this.selection = new Collection();
    this.featureOverlay = this.foService.getFeatureOverlay(this.map);
    this.featureOverlay.setStyle(this.bassinMapService.getStyle());
    const selectI = new Select({
      condition: condition.pointerMove,
      features: this.selection,
      layers: [this.featureOverlay],
      wrapX: false,
      style: this.bassinMapService.getHLStyle()
    });
    this.map.addInteraction(selectI);
    selectI.setActive(true);

    // open bassin detail on bassin click
    this.map.on('click', (event) => {
      const hit = this.map.forEachFeatureAtPixel(event.pixel, (feature) => {
        this.router.navigateByUrl('/bassins/detail/' + feature.getId());
        return true;
      });
    });

    // Cursor pointer on feature hover
    this.map.on('pointermove', (event) => {
      const hit = this.map.forEachFeatureAtPixel(event.pixel, () => true);
      this.map.getTargetElement().style.cursor =  hit ? 'pointer' : '';
    })
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

  // Bind grid hover to feature highlight
  highlight(row: any):void {
    this.selection.clear();
    this.featureOverlay.getSource().getFeatures().some( feature => {
      if (feature.getId() == row.gid) {
        this.selection.push(feature);
        return true;
      }
    });
  }

  private setFeatures(): void {
    this.bassins.forEach( bassin => {
      const feature = this.bassinMapService.setFeature(bassin, this.featureOverlay, this.map);
      feature.setId(bassin.gid);
    });
    const extent = this.featureOverlay.getSource().getExtent();
    const view = this.map.getView();
    view.fit(extent);
    this.map.updateSize();
  }

}
