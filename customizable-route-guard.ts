@Injectable({ providedIn: 'root' })
export class HasQueryParamGuardCreator {
  static guards: any[] = [];
  static hasParams = (...params: string[]) => {
    @Injectable()
    class HasQueryParamGuard implements CanActivate {

      constructor(private myService: MyService) {
      }

      canActivate(route: ActivatedRouteSnapshot): boolean {
        const hasAllParams = params.every(param => route.queryParamMap.get(param));
        return this.myService.additionalCheck() && params.length > 0 && hasAllParams;
      };
    }

    HasQueryParamGuardCreator.guards.push(HasQueryParamGuard);
    return HasQueryParamGuard;
  }
}
