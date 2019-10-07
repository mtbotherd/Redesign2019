$(function() {
    function writeToDom(data){
    console.log(data)
    $("#trips-amount").html(`${data.PlannerItin.PlannerOptions.length} &nbsp;`)
    $("#trip-plan-results").empty()
    data.PlannerItin.PlannerOptions.forEach(function(l,i){
      let list = [],secondList = [];
      l.Segments.forEach(function(li,ii){
        switch (li.SegmentType) {
          case 0:
            list.push(`<img class="icon"src="/img/svg/bus-gray.svg">&nbsp;
            <span class="route mr-1">${data.PlannerItin.PlannerOptions[i].Segments[ii].Route}</span>`)
            break;
          case 1:
            if(li.PublicRoute==="Blue Line"){
              list.push(`<span class="d-flex align-items-center badge badge-secondary mr-1">
                <img class="icon icon-lrt-white" src="/img/svg/lrt-white.svg">
                <span class="caps">Blue</span>
              </span>`)
            } else if(li.PublicRoute==="Green Line"){
              list.push(`<span class="d-flex align-items-center badge badge-success mr-1">
                <img class="icon icon-lrt-white" src="/img/svg/lrt-white.svg">
                <span class="caps">Green</span>
              </span>`)
            }
            break;
          case 2:
            list.push(`<img class="icon" src="/img/svg/circle-gray-outline-train.svg">`)
            break;
          case 3:
            list.push(`<img class="icon" src="/img/svg/pedestrian-gray.svg">`)
            break;
          case 4:
           list.push(`<img class="icon" src="/img/svg/circle-gray-outline-train.svg">`)
           break;
          default:
            console.log('This animal will not.')
          }
      })
      l.Segments.forEach(function(li,ii){
        switch(li.SegmentType){
          case 0:
            secondList.push(`<div class="leg-item">
            <div class="d-table-cell leg-time">1:10 p.m.</div>
            <div class="d-table-cell leg-mode bus">
              <div class="d-table-cell leg-mode-icon">
              <img class="icon" src="/img/svg/circle-gray-outline-train.svg">
              </div>
              <p>
                <img class="icon blink"
                   src="/img/svg/broadcast-red.svg">&nbsp;<strong>Currently 5
                  <abbr title="minutes">min</abbr> late</strong>
                <br>
                Route ${li.Route} ${li.OffStop.StopLocation.LocationName}
                <br>
                <a href="/home/#ServiceAlerts">
                  <small>view alerts</small>
                </a>
              </p>
              <p>
                <strong>Depart</strong> from ${li.OnStop.StopLocation.LocationName}
              </p>
              <p>
                <strong>Arrive</strong> at ${li.OffStop.StopLocation.LocationName}
              </p>
            </div>
          </div>`)
            break;
          case 1:
            secondList.push(`<div class="leg-item">
            <div class="d-table-cell leg-time">1:40 p.m.</div>
            <div class="d-table-cell leg-mode metro-${li.PublicRoute.split(" ", 1)}">
              <div class="d-table-cell leg-mode-icon">
                ${li.PublicRoute=== "Blue Line"?'<img class="icon" src="/img/svg/circle-green-outline-lrt.svg"/>':'<img class="icon" src="/img/svg/circle-blue-lrt.svg"/>'}
              </div>
              <p>
                <strong>${li.PublicRoute}</strong> to ${li.Route} ${li.SegmentDestination}
              </p>
              <p>
                <strong>Depart</strong> from ${li.OnStop.StopLocation.LocationName}
              </p>
              <p>
                <strong>Arrive</strong> at ${li.OffStop.StopLocation.LocationName}
              </p>
            </div>
          </div>`)
            break;
          case 2:
            secondList.push(`<div class="leg-item">
            <div class="d-table-cell leg-time">1:10 p.m.</div>
            <div class="d-table-cell leg-mode bus">
              <div class="d-table-cell leg-mode-icon">
                <img class="icon"
                   src="/img/svg/circle-gray-outline-bus.svg">
              </div>
              <p>
                <img class="icon blink"
                   src="/img/svg/broadcast-red.svg">&nbsp;<strong>Currently 5
                  <abbr title="minutes">min</abbr> late</strong>
                <br>
                Route ${li.Route} ${li.SegmentDestination}
                <br>
                <a href="/home/#ServiceAlerts">
                  <small>view alerts</small>
                </a>
              </p>
              <p>
                <strong>Depart</strong> from ${li.OnStop.StopLocation.LocationName}
              </p>
              <p>
                <strong>Arrive</strong> at ${li.OffStop.StopLocation.LocationName}
              </p>
            </div>
          </div>`)
            break;
          case 3:
            secondList.push(`<div class="leg-item">
            <div class="d-table-cell leg-time">1:10 p.m.</div>
            <div class="d-table-cell leg-mode walk">
              <div class="d-table-cell leg-mode-icon">
                <img class="icon"
                   src="/img/svg/circle-green-outline-pedestrian.svg">
              </div>
              <p>
                <strong>Walk</strong>${li.WalkTextOverview}
                <br>
                <small>
                  (about 6
                  <abbr title="minutes">min</abbr>)
                </small>
              </p>
            </div>
          </div>`)
            break;
          case 4:
            secondList.push(`<div class="leg-item">
            <div class="d-table-cell leg-time">1:10 p.m.</div>
            <div class="d-table-cell leg-mode walk">
              <div class="d-table-cell leg-mode-icon">
                <img class="icon"
                   src="/img/svg/alerts-color.svg">
              </div>
              <p>
                <strong>Walk</strong>${li.WalkTextOverview}
              </p>
            </div>
          </div>`)
            break;
          default:
          console.log(secondList)
        }
      })
     
    $("#trip-plan-results").append(`
          <div class="card mb-4">
            <a class="border" data-toggle="collapse" href="#collapse${i}" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapse${i}">
              <span class="d-flex" role="link">
                <span class="d-flex align-items-center tp-time">56
                  min</span>
                <span class="align-items-center tp-route">`+ list.join('<img class="icon chevron-right-gray mr-2" src="/img/svg/chevron-right-gray.svg">') +`
                  <img class="icon icon-arrow-right-blue ml-auto" src="/img/svg/arrow-right-blue.svg">
                </span>
              </span>
            </a>
          </div>

          <div id="collapse${i}" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
            <div class="card-body">
              <div class="row flex-row">
                    <div class="col-lg-5">
                      <div class="d-block tp-results">
                        `+ secondList.join(" ")+`
                      </div>
                      <div class="clearfix"></div>
                      <hr class="d-block d-lg-none">
                    </div>
                    <div class="col-lg-7">
                      <div class="tp-basemap">
                        <div class="map-container border">
                          <div id="tripPlanMap" class="map" mapType="trip" role="application" aria-label="interactive map of transit trip plan">
                            <div id="trimLocate"></div>
                            <div class="mapLoading"></div>
                          </div>
                        </div>
                      </div>
                    </div>
              </div>
            </div>
          </div>
          
          `)
    })
    }
})