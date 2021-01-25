@Injectable({ providedIn: 'root' })
export class HasQueryParamGuardCreator {
  // array where the created guards will be stored for passing it in the NgModule providers
  static guards: any[] = [];

  // creates a guard using the passed params
  static hasParams = (...params: string[]) => {
    @Injectable()
    class HasQueryParamGuard implements CanActivate {
      // possibility to inject other services
      constructor(private myService: MyService) {}

      canActivate = (route: ActivatedRouteSnapshot): boolean =>
        !params.length | this.myService.additionalCheck() && params.every(param => route.queryParamMap.get(param));
    }
    // Add the created guard
    HasQueryParamGuardCreator.guards.push(HasQueryParamGuard);
    return HasQueryParamGuard;
  }
}
// guards array has to be added to the providers to be available in the app
providers: [...HasQueryParamGuardCreator.guards ]
// create guards to allow only access to routes if the route contains the queryParams 'username' or 'lang'
const HasUsernameParamGuard = HasQueryParamGuardCreator.hasParams('username');
const HasLanguageParamGuard = HasQueryParamGuardCreator.hasParams('lang');
