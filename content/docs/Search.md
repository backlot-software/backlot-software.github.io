+++
weight = 100
date = "2026-06-15"
draft = true
author = "Jeroen Wijdven"
title = "Search"
icon = "rocket_launch"
toc = true
publishdate = "2026-06-15"
+++

# Search

Backlot on itself is not a search engine nor is it a database. While some concepts are similar, Backlot is not an ORM framework.
For these concepts we advise you to look at EntityFramework, SqlKata, Dapper etc. Because a lot of entities are handled within Backlot
there is a need to search for them.

## The Datamodel

For understanding how search works and what its potentials and limits are, we need to understand the datamodel.
Every Backlot installation consists of 2 repositories. The IPersistedRoleRepository and the IRelation repository. Most of the time represented by
2 collections (no sql databases). Everything stored is a representation of a role and it is important to understand that relations do occur
during scenario execution and are not part of a query. All concepts related to querying are explained below.

### Filtering with GetAll

Native Backlot does support filtering using Criteria. A collection of criteria is passed to the GetAll method.
Which is supported by every implementation of the IPersistedRoleRepository. A GetAll consists of the following parameters.

- Type; The RoleType or Skill you like to search for. (Remember an entity can have multiple skills)
- Criteria; A collection of conditions.
- Paging parameters; Used for pagination.
- DataTime Range; Used to limit the dataset to a certain time range.
- Orderby; Used to order the dataset on one or more fields.

Conditions are build using criteria.

```c#
new Criteria()
{
    Field = "Info", // the name of the role property it's advisable to use nameof(Role.Info)
    Condition = "ct", // eq = equals, ct = contains, gt = greater than, lt = less than,
    Value = "world" 
}
```

Under the hood the implementation of IPresistedRoleRepository does create a "where" clause (depending on the technique used) for you based on a collection of criteria. It does build groups and between these groups it creates "AND"s.
It works more or less the same as faceted search;

- All criteria for the same field are grouped together.
- Within a group an "OR" is used between all 'eq' and 'ct' criteria
- For 'gt' and 'lt' criteria an "AND" is created within the group.
- Between all groups an "AND" is used.

### Relations

Roles (Entities) can have relations with each other. Backlot does not something that is familair to JOINS in SQL. Instead it uses relations.
Relations "do occur". When a scenario is executed and a Role is assigned to that scenario and another Role as well. The relation is build. It works the same as in real life.
When people (actors) do meet eachother in a scenario, they know eachother. And that's what we call a relation. For relations we have the IRelationRepository.
With this you can get all relations for a certain role. This is also used by the detail scenario that's part of the package 'Chaplin.Defaults'.

Roles do have a reference when they implement the Role / Skill IUid. All IPersist roles do implement this. Only Roles with a IUid can be related.

An example.

```c#
// get the relations of a certain role
var references = RelationRepository.GetAll(Role.GetReference());

// get the related roles
var roles = await RoleRepository.GetBulk(references);
```

### (Free) Text Search and OR

Use cases with a free text search requirement or a requirement to have an "OR" between groups (see 'Filtering with GetAll') can be solved by making use of the above principles.
Text search f.e. is supported via the conditions / criteria principles. Looking to the Backlot narrative that everything is a role, an actor or a scenario you have to define that within this "free text search scenario"
you have a requirement an entity has a free text index. By doing this you can use the GetAll method to search for roles.

Example;

Add a Text property to your role model;

```c#
public interface IMyFreeTextRole : IRole
{
    string FreeTextIndex {get;set;}
}
```

Roles can have more skills that's why we use interfaces. Feel free to add this interface to every role you need to have free text search available.

Create an instructor to fill the FreeTextIndex property.

```c#
public static class FreeTextSearchInitializer
{
    public static IPerformanceVenue Initialize(IMyFreeTextRole item, object _)
    {
        // add your logic here to build the freetext string.
        item.FreeTextSearchIndex = $"{item.Name} ... ... ... ";
        return item;
    }
}
```

Then use the criteria by using the Find scenario via f.e. a web request or directly by using the RoleRepository.

```c#
new Criteria()
{
    Field = nameof(IMyFreeTextRole.FreeTextSearchIndex),
    Condition = "ct",
    Value = "search value" 
}
```

## Important (default) scenarios

The Chaplin.Defaults library is having a couple of scenarios available out of the box to help you with search related use cases;

- Details; Returns the details of a single role **including** its relations.
- Relate; Expects to be executed by a IReferenceCollection role. Which on itself is a collection of RoleReferences. All references defined do get a relation with eachother.
- Relations; Returns all relations of a certain role. It is a scenario wrapped around IRelationRepository.GetAll.
- Find; Does use a role called 'ISimpleQuey', which is a representation of the parameters of GetAll. Therefor you can say this a scenario wrapped around the 'GetAll' method.
