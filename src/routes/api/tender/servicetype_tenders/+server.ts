import { supabase } from "$lib/server/supabaseclient.server";
import type { RequestEvent } from "./$types";

export async function POST({
  request,
  cookies,
}: RequestEvent): Promise<Response> {
  let ret_text;
  let given_serviceid=1;
  let { data: result, error } = await supabase.rpc("get_all_servicetype_tenders", {
    given_serviceid,
});

  if (error) {
    ret_text = {
      errorcode: -1,
    };
  } else {
    ret_text = result;
  }

  return new Response(JSON.stringify(ret_text), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
