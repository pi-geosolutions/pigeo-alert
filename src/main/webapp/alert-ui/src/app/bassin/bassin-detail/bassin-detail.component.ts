import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Bassin} from "../bassin";
import {BassinService} from "../bassin.service";
import Map from "ol/map.js";
import {FeatureOverlayService} from "../../ngeo/feature-overlay/feature-overlay.service";
import VectorLayer from "ol/layer/vector.js";
import {GeometryService} from "../../ngeo/geom/geometry.service";
import {BassinMapService} from "../bassin-map.service";

@Component({
  selector: 'app-bassin-detail',
  templateUrl: './bassin-detail.component.html',
  styleUrls: ['./bassin-detail.component.scss']
})
export class BassinDetailComponent implements OnInit {

  bassin: Bassin;
  map: Map;
  the_geom: any;
  private featureOverlay: VectorLayer;
  firstChangeCheck: boolean = false;
  private pristineGeom: any;

  bassinForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private bassinService: BassinService,
    private bassinMapService: BassinMapService,
    private foService: FeatureOverlayService,
    private geomService: GeometryService,
    private location: Location,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.bassinForm = this.fb.group({
      maj_name: {value:'', disabled: true},
      sub_name: {value:'', disabled: true}
    });
  }

  ngOnInit(): void {
    this.getBassin().subscribe((bassin) => {
      this.bassin = bassin;
      this.bassinForm.setValue({
        maj_name: this.bassin.maj_name,
        sub_name: this.bassin.sub_name
      });
      this.setFeature(bassin);
    });
    this.map = this.bassinMapService.initMap();
    this.featureOverlay = this.foService.getFeatureOverlay(this.map);
  }

  getBassin() {
    const id = +this.route.snapshot.paramMap.get('id');
    return this.bassinService.getBassin(id)
  }

  goBack(): void {
    this.location.back();
  }

  private setFeature(bassin: Bassin): void {
    const feature = this.bassinMapService.setFeature(bassin, this.featureOverlay, this.map);
    const view = this.map.getView();
    view.fit(feature.getGeometry().getExtent());
    view.setZoom(view.getZoom() + 2);
  }
}
