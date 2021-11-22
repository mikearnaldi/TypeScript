interface Person {
    readonly firstName: string
    readonly lastName: string
}

const person: Person = {
    firstName: "Mike",
    lastName: "Arnaldi"
};

/**
 * @ets_extension setFirst
 */
export function setFirst(self: Person, name: string): Person {
    return {
        firstName: name,
        lastName: self.lastName
    };
}

export const ok = person.setFirst("ok").setFirst("ok");
