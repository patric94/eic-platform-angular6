import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrowseCategoriesComponent} from './pages/browsecategories/browse-categories.component';
import {CompareServicesComponent} from './pages/compare/compare-services.component';
import {ServiceUploadComponent} from './pages/eInfraServices/service-upload.component';
import {HomeComponent} from './pages/home/home.component';
import {CommonModule} from '@angular/common';
import {SearchComponent} from './pages/search/search.component';
import {CanActivateViaAuthGuard} from './services/can-activate-auth-guard.service';
import {ServiceLandingPageComponent} from './pages/landingpages/service/service-landing-page.component';
import {NewServiceProviderComponent} from './pages/serviceprovider/new-service-provider.component';
import {ServiceProvidersListComponent} from './pages/admin/service-providers-list.component';
import {AddFirstServiceComponent} from './pages/serviceprovider/add-first-service.component';
import {MyServiceProvidersComponent} from './pages/serviceprovider/my-service-providers.component';
import {UpdateServiceProviderComponent} from './pages/serviceprovider/update-service-provider.component';
import {ServiceProviderInfoComponent} from './pages/serviceprovider/service-provider-info.component';
import {FundersDashboardComponent} from './pages/funders/funders-dashboard.component';
import {MyFavouritesComponent} from './pages/user/favourites/my-favourites.component';
import {ServiceEditComponent} from './pages/eInfraServices/service-edit.component';
import {MeasurementsComponent} from './pages/indicators/measurements.component';
import {IndicatorFromComponent} from './pages/indicators/indicator-from.component';
import {DashboardComponent} from './pages/user/dashboard/dashboard.component';
import {ServiceDashboardComponent} from './pages/user/dashboard/service-dashboard.component';
import {DevelopersComponent} from './pages/support/developers/developers.component';
import {OpenAPIComponent} from './pages/support/openapi/openapi.component';
import {FAQsComponent} from './pages/support/faqs/faqs.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      breadcrumb: 'Home'
    }
  },
  {
    path: 'search',
    component: SearchComponent,
    data: {
      breadcrumb: 'Search'
    }
  },
  {
    path: 'compare',
    component: CompareServicesComponent,
    data: {
      breadcrumb: 'Compare'
    }
  },
  // {
  //   path: 'browseCategories',
  //   component: BrowseCategoriesComponent,
  //   data: {
  //     breadcrumb: 'Browse'
  //   }
  // },
  {
    path: 'service/:id',
    component: ServiceLandingPageComponent,
    data: {
      breadcrumb: 'Service'
    }
  },
  {
    path: 'service/:id/:version',
    component: ServiceLandingPageComponent,
    data: {
      breadcrumb: 'Service'
    }
  },
  {
    path: 'upload',
    component: ServiceUploadComponent,
    canActivate: [CanActivateViaAuthGuard],
    data: {
      breadcrumb: 'Upload'
    }
  },
  {
    path: 'edit/:id',
    component: ServiceEditComponent,
    canActivate: [CanActivateViaAuthGuard],
    data: {
      breadcrumb: 'Edit'
    }
  },
  {
    path: 'newServiceProvider',
    component: NewServiceProviderComponent,
    canActivate: [CanActivateViaAuthGuard],
    data: {
      breadcrumb: 'New Service Provider'
    }
  },
  {
    path: 'serviceProviderInfo/:id',
    component: ServiceProviderInfoComponent,
    canActivate: [CanActivateViaAuthGuard],
    data: {
      breadcrumb: 'Service Provider Info'
    }
  },
  {
    path: 'updateServiceProvider/:id',
    component: UpdateServiceProviderComponent,
    canActivate: [CanActivateViaAuthGuard],
    data: {
      breadcrumb: 'Update Service Provider'
    }
  },
  {
    path: 'newServiceProvider/:id/addFirstService',
    component: AddFirstServiceComponent,
    canActivate: [CanActivateViaAuthGuard],
    data: {
      breadcrumb: 'First Service Form'
    }
  },
  {
    path: 'newServiceProvider/:id/editFirstService/:serviceId',
    component: AddFirstServiceComponent,
    canActivate: [CanActivateViaAuthGuard],
    data: {
      breadcrumb: 'Edit First Service'
    }
  },
  // {
  //   path: 'myServiceProviders',
  //   loadChildren: 'src/app/pages/serviceprovider/service-provider.module#ServiceProviderModule',
  //   // loadChildren: () => import('src/app/pages/serviceprovider/service-provider.module').then(mod => mod.ServiceProviderModule ),
  //   canActivate: [CanActivateViaAuthGuard],
  //   data: {
  //     breadcrumb: 'My Service Providers'
  //   }
  // },
  {
    path: 'myFavourites',
    component: MyFavouritesComponent,
    canActivate: [CanActivateViaAuthGuard],
    data: {
      breadcrumb: 'My Favourites'
    }
  },
  {
    path: 'serviceProvidersList',
    component: ServiceProvidersListComponent,
    canActivate: [CanActivateViaAuthGuard],
    data: {
      breadcrumb: 'Service Providers'
    }
  },
  {
    path: 'fundersDashboard',
    component: FundersDashboardComponent,
    data: {
      breadcrumb: 'Funders Dashboard'
    }
  },
  {
    path: 'measurements/service/:id',
    component: MeasurementsComponent,
    data: {
      breadcrumb: 'Service Measurements'
    }
  },
  {
    path: 'newIndicator',
    component: IndicatorFromComponent,
    data: {
      breadcrumb: 'New Indicator'
    }
  },
  /** Routing with children **/

  /** Provider **/
  {
    path: 'myServiceProviders',
    // component: MyServiceProvidersComponent,
    canActivate: [CanActivateViaAuthGuard],
    data: {
      breadcrumb: 'My Service Providers'
    },
    children: [
      {
        path: 'newServiceProvider',
        component: NewServiceProviderComponent,
        canActivate: [CanActivateViaAuthGuard],
        data: {
          breadcrumb: 'New Service Provider'
        }
      },
      {
        path: 'updateServiceProvider/:id',
        component: UpdateServiceProviderComponent,
        canActivate: [CanActivateViaAuthGuard],
        data: {
          breadcrumb: 'Update Service Provider'
        }
      },
      {
        path: ':provider/dashboard',
        // component: DashboardComponent,
        canActivate: [CanActivateViaAuthGuard],
        data: {
          breadcrumb: 'Provider dashboard'
        },
        children: [
          {
            path: 'upload',
            component: ServiceUploadComponent,
            canActivate: [CanActivateViaAuthGuard],
            data: {
              breadcrumb: 'Upload'
            }
          },
          {
            path: ':id',
            // component: ServiceDashboardComponent,
            canActivate: [CanActivateViaAuthGuard],
            data: {
              breadcrumb: 'Service dashboard'
            },
            children: [
              {
                path: 'service',
                component: ServiceLandingPageComponent,
                data: {
                  breadcrumb: 'Service'
                }
              },
              {
                path: 'edit',
                component: ServiceEditComponent,
                canActivate: [CanActivateViaAuthGuard],
                data: {
                  breadcrumb: 'Edit'
                }
              },
              {
                path: '',
                component: ServiceDashboardComponent,
                canActivate: [CanActivateViaAuthGuard],
                data: {
                  breadcrumb: ''
                }
              }
            ]
          },
          {
            path: '',
            component: DashboardComponent,
            canActivate: [CanActivateViaAuthGuard],
            data: {
              breadcrumb: ''
            }
          }
        ]
      },
      {
        path: '',
        component: MyServiceProvidersComponent,
        canActivate: [CanActivateViaAuthGuard],
        data: {
          breadcrumb: ''
        }
      }
    ]
  },
  /** Provider **/

  /** Admin **/
  {
    path: 'serviceProvidersList',
    // component: ServiceProvidersListComponent,
    canActivate: [CanActivateViaAuthGuard],
    data: {
      breadcrumb: 'Service Providers'
    },
    children: [
      {
        path: 'serviceProviderInfo/:id',
        component: ServiceProviderInfoComponent,
        canActivate: [CanActivateViaAuthGuard],
        data: {
          breadcrumb: 'Service Provider Info'
        }
      },
      {
        path: '',
        component: ServiceProvidersListComponent,
        canActivate: [CanActivateViaAuthGuard],
        data: {
          breadcrumb: ''
        }
      },
    ]
  },
  /** Admin **/

  /** Developers **/
  {
    path: 'developers',
    // component: DevelopersComponent,
    data: {
      breadcrumb: 'Developers'
    },
    children: [
      {
        path: 'openapi',
        component: OpenAPIComponent,
        data: {
          breadcrumb: 'Open API'
        }
      },
      {
        path: '',
        component: DevelopersComponent,
        data: {
          breadcrumb: ''
        }
      }
    ]
  },
  /** Developers **/

  /** FAQ **/
  {
    path: 'support/faqs',
    component: FAQsComponent,
    data: {
      breadcrumb: 'FAQs'
    }
  },
  /** FAQ **/

  /** Browse **/
  {
    path: 'browseCategories',
    // component: BrowseCategoriesComponent,
    data: {
      breadcrumb: 'Browse'
    },
    children: [
      {
        path: ':id/service',
        component: ServiceLandingPageComponent,
        data: {
          breadcrumb: 'Service'
        }
      },
      {
        path: ':id/edit',
        component: ServiceEditComponent,
        canActivate: [CanActivateViaAuthGuard],
        data: {
          breadcrumb: 'Edit'
        }
      },
      {
        path: '',
        component: BrowseCategoriesComponent,
        data: {
          breadcrumb: ''
        }
      }
    ]
  },
  /** Browse **/

  /** Search **/
  {
    path: 'search',
    // component: SearchComponent,
    data: {
      breadcrumb: 'Search'
    },
    children: [
      {
        path: 'service/:id',
        component: ServiceLandingPageComponent,
        data: {
          breadcrumb: 'Service'
        }
      },
      {
        path: '',
        component: SearchComponent,
        data: {
          breadcrumb: ''
        }
      }
    ]
  },
  /** Search **/

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false // for debug -> true
      }
    )
  ],
  declarations: [],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

// export const appRoutingProviders: any[] = [];
// export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
