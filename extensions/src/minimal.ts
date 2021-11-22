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
function setFirst(self: Person, name: string): Person {
    return {
        firstName: name,
        lastName: self.lastName
    };
}

const ok = person.setFirst("mike").setFirst("mike").setFirst("ok").setFirst("ok");
