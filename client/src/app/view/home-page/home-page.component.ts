import { KeyValue } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { Subscription } from 'rxjs';
import { SocketEmit } from 'src/app/interfaces/service';
import {
  SelectedFilters,
  ServerState,
  TorrentInfo,
} from 'src/app/interfaces/torrent';
import { Torrents } from 'src/app/models/torrent.model';
import { SocketService } from 'src/app/services/socket.service';
import { TorrentService } from 'src/app/services/torrent.service';
import { chartOptions } from 'src/app/_helper/chartConfig';
import { sort } from 'src/app/_helper/variables';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  private graphTimer: any;
  public torrents: Torrents;
  public server_state: ServerState = {};
  public selectedFilters: SelectedFilters = {
    Status: 'all',
    Tag: 'all',
    Tracker: 'all',
    Category: 'all',
  };

  private chartData: {
    data1: number[];
    data2: number[];
  } = { data1: new Array(21).fill(0), data2: new Array(21).fill(0) };

  @ViewChild('chart') chart: ChartComponent;
  public chartOptions = chartOptions;

  constructor(public torrentService: TorrentService) {
    this.torrents = this.torrentService.torrents;
    this.server_state = this.torrentService.server_state;
    this.torrentService.updateChart.subscribe(() => {
      this.chartData.data1.push(this.server_state.up_info_speed || 0);
      this.chartData.data2.push(this.server_state.dl_info_speed || 0);
      this.chart.updateSeries([
        {
          name: 'Download',
          data: this.chartData.data2,
          color: '#79CEF0',
        },
        {
          name: 'Upload',
          data: this.chartData.data1,
          color: '#79E2A6',
        },
      ]);
    });
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {}

  sortByState(
    a: KeyValue<string, TorrentInfo>,
    b: KeyValue<string, TorrentInfo>
  ) {
    const current = sort.indexOf(a.value.state); //-1
    const next = sort.indexOf(b.value.state); //
    if (current - next < 0) {
      return 1;
    } else if (current - next == 0) {
      return a.value.name.localeCompare(b.value.name);
    } else return -1;
  }

  ngAfterViewInit() {
    this.chartData = {
      data1: new Array(21).fill(0),
      data2: new Array(21).fill(0),
    };
  }

  handleSelectFilter(
    filter: 'Status' | 'Category' | 'Tag' | 'Tracker',
    key: string
  ) {
    this.selectedFilters[filter] = key;
    this.selectedFilters = { ...this.selectedFilters };
  }
}
