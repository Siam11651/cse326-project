import type { SignupArgs } from "./signup-args";
import { InvalidEmailError, InvalidUserNameError, InvalidUsernameEmailError } from "./signup-errors";

export class StateManager
{
    private static STATE_COUNT: number = 3;
    private static username: string | null = null;
    private static email: string | null = null;
    private static passwordHash: string | null = null;
    private static pfp: Uint8Array | null;
    private static contact: string | null;
    private static nid: string | null = null;

    public static GetStateCount(): number
    {
        return StateManager.STATE_COUNT;
    }

    public static async GoNext(currentState: number, args: SignupArgs): Promise<number>
    {
        if(currentState == 0)
        {
            let usernameValid = StateManager.SetUsername(args.username);
            let emailValid = StateManager.SetEmail(args.email);

            if(!usernameValid && !emailValid)
            {
                throw new InvalidUsernameEmailError();
            }
            else if(!usernameValid)
            {
                throw new InvalidUserNameError();
            }
            else if(!emailValid)
            {
                throw new InvalidEmailError();
            }
        }
        else if(currentState == 1)
        {
            StateManager.SetPasswordHash(args.password);
        }
        else if(currentState == 2)
        {
            await StateManager.SetPfp(args.pfp);
            StateManager.SetContact(args.contact);
            StateManager.SetNid(args.nid);
        }
        
        return currentState + 1;
    }

    public static GoBack(currentState: number, args: any): number
    {
        return currentState - 1;
    }

    private static SetUsername(username: string | null): boolean
    {
        if(username == null)
        {
            return false;
        }

        if(username.length == 0)
        {
            return false;
        }

        if(username.includes(" "))
        {
            return false;
        }

        StateManager.username = username;

        return true;
    }

    private static SetEmail(email: string | null): boolean
    {
        if(email == null)
        {
            return false;
        }

        if(email.length == 0)
        {
            return false;
        }

        StateManager.email = email;

        return true;
    }

    private static SetPasswordHash(password: string | null): boolean
    {
        StateManager.passwordHash = password;

        return true;
    }

    private static async SetPfp(pfp: File | null): Promise<boolean>
    {
        if(pfp == null)
        {
            return false;
        }

        let arrayBuffer: ArrayBuffer = await pfp.arrayBuffer();
        StateManager.pfp = new Uint8Array(arrayBuffer);

        return true;
    }

    private static SetContact(contact: string | null): boolean
    {
        StateManager.contact = contact;

        return true;
    }

    private static SetNid(nid: string | null): boolean
    {
        StateManager.nid = nid;

        return true;
    }

    public static async SignUp(): Promise<void>
    {
        let requestBodyObject =
        {
            name: StateManager.username,
            email: StateManager.email,
            password_hash: StateManager.passwordHash,
            pfp: StateManager.pfp,
            contact: StateManager.contact,
            nid: StateManager.nid
        };

        let requestBodyString = JSON.stringify(requestBodyObject);

        console.log(requestBodyString);

        fetch("/api/consumer/signup", 
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: requestBodyString
        }).then((response: Response): void =>
        {
        });
    }
};
