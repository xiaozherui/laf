///////////////////////////////////////////////////////////////////////
//                                                                   //
// this file is autogenerated by service-generate                    //
// do not edit this file manually                                    //
//                                                                   //
///////////////////////////////////////////////////////////////////////
/// <reference path = "api-auto.d.ts" />
import request from "@/utils/request";

/**
 * Get application runtime list
 */
export async function SpecsControllerGetBundles(
  params: Paths.SpecsControllerGetBundles.BodyParameters | any,
): Promise<Paths.SpecsControllerGetBundles.Responses> {
  // /v1/bundles
  let _params: { [key: string]: any } = {
    appid: localStorage.getItem("app"),
    ...params,
  };
  return request(`/v1/bundles`, {
    method: "GET",
    params: params,
  });
}