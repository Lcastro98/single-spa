import { registerApplication, start } from "single-spa";

 registerApplication({
   name: "@sofka/react-app",
   app: () => System.import("@sofka/react-app"),
   activeWhen: ["/react"]
 });

 registerApplication({
  name: "angular-app",
  app: () => System.import("angular-app"),
  activeWhen: ["/angular"]
});

start({
  urlRerouteOnly: true,
});
