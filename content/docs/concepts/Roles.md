+++
weight = 100
date = "2026-06-15"
draft = false
author = "Jeroen Wijdven"
title = "Roles"
icon = "rocket_launch"
toc = true
publishdate = "2026-06-15"
+++


## Role

Roles are the entities flowing around in your application. The are "played" by the "outside" actors. Roles play scenarios together or alone with other roles. Roles are automatically related as soon as they play together in a scenario. The origins we call "Actors". The role is represented by the actor. You can see the role itself as the definition. An important thing to note is that we never "forget" the actor, just like in movies you can also see which actor is representing the role. There for the technique underneath is proxying and not mapping. As soon as the properties of the Actor are equal to the role definition it's easy to present the actor as the defined role. But Chaplin also has techniques to make sure actors are "learning" the role. 

Some (other) features to keep in mind:
- Actor properties not part of a role definition are not lost.
- Actors can also play different roles, as soon as they can present their selfs as the (other) role it's added to it's "Skill" set.
- Persisted roles do have permissions, which allows you to secure data

We do recognise the next actor types;

### Become

All other Actors we call "Become" the role. Under the hood this is done by proxying the origin actor. We support "typed", "json" and "dictionary" origins.

### Self

Typed objects implementing the role interface themself we call "Selfs". They do not need to be proxied, because on itself they are already presenting the role. In below example "FormulaSelf" is such a self role. It has to implement every piece of the interface by itself.

Important notes: 
- Since version 1.5.0 Selfs also need to be Presented.
- The real power of Chaplin is in "Become" roles. Become roles do rely on an extensive system of merging and managing history and 

## Examples

### A Role Definition

```
// The Role:
public interface IFormula : IPersist
{
    string Operation { get; set; }

    int? Number1 { get; set; }
    int? Number2 { get; set; }
    [Calculated] // calculated properties are filled (calcuated) by scenarios
    int? Number3 { get; set; }
}

```

### A Json or Anonymous Role Example

```

var initial = new
{
    Uid = uid,
    Number1 = 7,
    Number2 = 9,
    Operation = "sum",
    ExtraInfo = "With anonymous, json or dictionary actors you can define extra properties which are not defined by the role interface, but they are not persisted for future (agile) reasons."
}.Presents<IFormula>();

await formula.PlayAsync<Calculate>();

```

### A Self Role Example

```
// The "Self":
public class FormulaSelf : IFormula
{
    public string Operation { get; set; } = null!;
    public int? Number1 { get; set; }
    public int? Number2 { get; set; }
    [Calculated]
    public int? Number3 { get; set; }

    public string Uid { get; set; } = null!;

    string? IPermission.__Permission { get; set; }
}

// Present a self role, always ensures 
// all none calculated fields are defined

var formula = new FormulaSelf()
{
    Uid = "f5d3c5aa",
    Number1 = 12,
    Number2 = 10,
    Operation = "sum"
}.Presents<IFormula>();

await formula.PlayAsync<Calculate>();

```

### Get Skills

```
// Get all roles this role / actor has learned:

role.Skills()
```

## Related articles
[Scenario based programming](https://codevelo.us/2023/08/23/chaplin-scenario-based-programming/)

