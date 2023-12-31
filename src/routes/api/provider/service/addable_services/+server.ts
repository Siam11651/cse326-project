import { supabase } from "$lib/server/supabaseclient.server";
import type { RequestEvent } from "./$types";
import jwt from "jsonwebtoken";

export async function POST({
  request,
  cookies,
}: RequestEvent): Promise<Response> {
  let token: string | undefined = cookies.get("pjwt");

  if (token) {
    let decodedToken: any = jwt.verify(token, import.meta.env.VITE_JWT_KEY); // any dichhi lal dag shoraite, amar buk ta faita jaitese any deyar jonno, cringe
    let ret_text;
    let given_pid = decodedToken.id;

    let { data: result, error } = await supabase.rpc("get_addable_services", {
      given_pid,
    });
    if (error) {
      console.log(error);

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

  return new Response(JSON.stringify({errorcode: -2}), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
