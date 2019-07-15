import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
  providerDescriptionDesc,
  contactEmailDesc,
  contactNameDesc,
  contactTelDesc,
  Description,
  emailDesc,
  firstNameDesc,
  lastNameDesc,
  logoUrlDesc,
  organizationIdDesc,
  organizationNameDesc,
  organizationWebsiteDesc,
} from '../eInfraServices/services.description';
import {AuthenticationService} from '../../services/authentication.service';
import {ServiceProviderService} from '../../services/service-provider.service';
import {Router} from '@angular/router';
import {URLValidator} from '../../shared/validators/generic.validator';

declare var UIkit: any;

@Component({
  selector: 'app-new-service-provider',
  templateUrl: './new-service-provider.component.html'
})
export class NewServiceProviderComponent implements OnInit {
  errorMessage = '';
  logoError = false;
  logoUrlWorks = false;
  userInfo = {family_name: '', given_name: '', email: ''};
  newProviderForm: FormGroup;
  logoUrl = '';

  readonly formDefinition = {
    id: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-z][a-zA-Z0-9-_]{1,}$/)])],
    name: ['', Validators.required],
    logo: ['', URLValidator],
    // contactInformation: [''],
    description: ['', Validators.required],
    website: ['', Validators.compose([Validators.required, URLValidator])],
    contactEmail: ['', Validators.compose([Validators.required, Validators.email])],
    contactName: ['', Validators.required],
    contactTel: ['', Validators.required],
    // catalogueOfResources: ['', URLValidator],
    // publicDescOfResources: ['', URLValidator],
    // additionalInfo: ['', Validators.required]
  };
  organizationIdDesc: Description = organizationIdDesc;
  organizationNameDesc: Description = organizationNameDesc;
  firstNameDesc: Description = firstNameDesc;
  lastNameDesc: Description = lastNameDesc;
  emailDesc: Description = emailDesc;
  contactTelDesc: Description = contactTelDesc;
  organizationWebsiteDesc: Description = organizationWebsiteDesc;
  contactNameDesc: Description = contactNameDesc;
  contactEmailDesc: Description = contactEmailDesc;
  providerDescriptionDesc: Description = providerDescriptionDesc;
  logoUrlDesc: Description = logoUrlDesc;


  constructor(private fb: FormBuilder,
              private authService: AuthenticationService,
              private serviceProviderService: ServiceProviderService,
              private router: Router) {
  }

  ngOnInit() {
    this.newProviderForm = this.fb.group(this.formDefinition);
    this.userInfo.given_name = this.authService.getUserProperty('given_name');
    this.userInfo.family_name = this.authService.getUserProperty('family_name');
    this.userInfo.email = this.authService.getUserProperty('email');
  }

  registerProvider() {
    this.errorMessage = '';
    this.trimFormWhiteSpaces();

    if (this.newProviderForm.valid) {
      const newProvider = Object.assign(
        this.newProviderForm.value
      );

      this.serviceProviderService.createNewServiceProvider(this.newProviderForm.value).subscribe(
        res => {},
        err => {
          this.errorMessage = 'Something went wrong. ' + err.error;
        },
        () => {
          this.router.navigate(['/myServiceProviders']);
        }
      );
    } else {
      this.newProviderForm.markAsDirty();
      this.newProviderForm.updateValueAndValidity();
      for (const i in this.newProviderForm.controls) {
        this.newProviderForm.controls[i].markAsDirty();
      }
      window.scrollTo(0, 0);
      if (!this.newProviderForm.valid) {
        this.errorMessage = 'Please fill in all required fields (marked with an asterisk),' +
          ' and fix the data format in fields underlined with a red colour.';
      }
      // if (this.logoError) {
      //   this.newProviderForm.get('logo').setErrors({'incorrect': true});
      //   this.logoError = false;
      //   this.errorMessage += ' Logo url must have https:// prefix';
      // }
      // if (!this.logoUrlWorks) {
      //   this.newProviderForm.get('logo').setErrors({'incorrect': true});
      //   this.errorMessage += ' Logo url doesn\'t point to a valid image';
      // }
    }
  }

  showLogoUrlModal() {
    if (this.newProviderForm && this.newProviderForm.get('logo').value) {
      this.logoUrl = this.newProviderForm.get('logo').value;
    }
    UIkit.modal('#logoUrlModal').show();
  }

  addLogoUrl(logoUrl: string) {
    UIkit.modal('#logoUrlModal').hide();
    this.logoUrl = logoUrl;
    this.newProviderForm.get('logo').setValue(logoUrl);
    this.newProviderForm.get('logo').updateValueAndValidity();
  }

  imageExists(url) {
    if (url === '') {// image is not required for providers
      return true;
    }
    const image = new Image();
    image.src = url;
    if (!image.complete) {
      return false;
    } else if (image.height === 0) {
      return false;
    }

    return true;
  }

  trimFormWhiteSpaces() {
    for (const i in this.newProviderForm.controls) {
      if (this.newProviderForm.controls[i].value !== '') {
        this.newProviderForm.controls[i].setValue(this.newProviderForm.controls[i].value.trim().replace(/\s\s+/g, ' '));
      }
    }
  }

}
