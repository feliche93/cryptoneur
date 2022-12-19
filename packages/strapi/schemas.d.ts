import {
  CollectionTypeSchema,
  StringAttribute,
  RequiredAttribute,
  SetMinMaxLength,
  JSONAttribute,
  DefaultTo,
  RelationAttribute,
  DateTimeAttribute,
  PrivateAttribute,
  EmailAttribute,
  UniqueAttribute,
  PasswordAttribute,
  BooleanAttribute,
  EnumerationAttribute,
  BigIntegerAttribute,
  IntegerAttribute,
  DecimalAttribute,
  SetMinMax,
  ComponentAttribute,
  MediaAttribute,
  SetPluginOptions,
  TextAttribute,
  RichTextAttribute,
  CustomField,
  UIDAttribute,
  DynamicZoneAttribute,
  ComponentSchema,
} from '@strapi/strapi';

export interface AdminPermission extends CollectionTypeSchema {
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    subject: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: JSONAttribute & DefaultTo<{}>;
    conditions: JSONAttribute & DefaultTo<[]>;
    role: RelationAttribute<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminUser extends CollectionTypeSchema {
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    username: StringAttribute;
    email: EmailAttribute &
      RequiredAttribute &
      PrivateAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    registrationToken: StringAttribute & PrivateAttribute;
    isActive: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    roles: RelationAttribute<'admin::user', 'manyToMany', 'admin::role'> &
      PrivateAttribute;
    blocked: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    preferedLanguage: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'admin::user', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'admin::user', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface AdminRole extends CollectionTypeSchema {
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    code: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute;
    users: RelationAttribute<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: RelationAttribute<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'admin::role', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'admin::role', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface AdminApiToken extends CollectionTypeSchema {
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }> &
      DefaultTo<''>;
    type: EnumerationAttribute<['read-only', 'full-access', 'custom']> &
      RequiredAttribute &
      DefaultTo<'read-only'>;
    accessKey: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: DateTimeAttribute;
    permissions: RelationAttribute<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: DateTimeAttribute;
    lifespan: BigIntegerAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminApiTokenPermission extends CollectionTypeSchema {
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    token: RelationAttribute<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFile extends CollectionTypeSchema {
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute & RequiredAttribute;
    alternativeText: StringAttribute;
    caption: StringAttribute;
    width: IntegerAttribute;
    height: IntegerAttribute;
    formats: JSONAttribute;
    hash: StringAttribute & RequiredAttribute;
    ext: StringAttribute;
    mime: StringAttribute & RequiredAttribute;
    size: DecimalAttribute & RequiredAttribute;
    url: StringAttribute & RequiredAttribute;
    previewUrl: StringAttribute;
    provider: StringAttribute & RequiredAttribute;
    provider_metadata: JSONAttribute;
    related: RelationAttribute<'plugin::upload.file', 'morphToMany'>;
    folder: RelationAttribute<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      PrivateAttribute;
    folderPath: StringAttribute &
      RequiredAttribute &
      PrivateAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFolder extends CollectionTypeSchema {
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    pathId: IntegerAttribute & RequiredAttribute & UniqueAttribute;
    parent: RelationAttribute<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: RelationAttribute<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: RelationAttribute<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginI18NLocale extends CollectionTypeSchema {
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: StringAttribute & UniqueAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsPermission extends CollectionTypeSchema {
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute & RequiredAttribute;
    role: RelationAttribute<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsRole extends CollectionTypeSchema {
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 3;
      }>;
    description: StringAttribute;
    type: StringAttribute & UniqueAttribute;
    permissions: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsUser extends CollectionTypeSchema {
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 3;
      }>;
    email: EmailAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: StringAttribute;
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    confirmationToken: StringAttribute & PrivateAttribute;
    confirmed: BooleanAttribute & DefaultTo<false>;
    blocked: BooleanAttribute & DefaultTo<false>;
    role: RelationAttribute<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiAuthorAuthor extends CollectionTypeSchema {
  info: {
    singularName: 'author';
    pluralName: 'authors';
    displayName: 'Author';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: StringAttribute & RequiredAttribute;
    socials: ComponentAttribute<'shared.socials'>;
    avatar: MediaAttribute & RequiredAttribute;
    posts: RelationAttribute<
      'api::author.author',
      'manyToMany',
      'api::post.post'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::author.author',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::author.author',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiBlockchainBlockchain extends CollectionTypeSchema {
  info: {
    singularName: 'blockchain';
    pluralName: 'blockchains';
    displayName: 'Blockchain';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: StringAttribute & RequiredAttribute;
    grants: RelationAttribute<
      'api::blockchain.blockchain',
      'manyToMany',
      'api::grant.grant'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::blockchain.blockchain',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::blockchain.blockchain',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiCurrencyCurrency extends CollectionTypeSchema {
  info: {
    singularName: 'currency';
    pluralName: 'currencies';
    displayName: 'Currency';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: StringAttribute & RequiredAttribute;
    symbol: StringAttribute & RequiredAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::currency.currency',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::currency.currency',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiGrantGrant extends CollectionTypeSchema {
  info: {
    singularName: 'grant';
    pluralName: 'grants';
    displayName: 'Grant';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    logo: MediaAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    fundingMinimum: ComponentAttribute<'shared.currency-token-value'> &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    fundingMaximum: ComponentAttribute<'shared.currency-token-value'> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    description: TextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    active: BooleanAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      DefaultTo<true>;
    linkApplication: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    linkInfo: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    socials: ComponentAttribute<'shared.socials'> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    blockchains: RelationAttribute<
      'api::grant.grant',
      'manyToMany',
      'api::blockchain.blockchain'
    >;
    grantCategories: RelationAttribute<
      'api::grant.grant',
      'manyToMany',
      'api::grant-category.grant-category'
    >;
    grantUseCases: RelationAttribute<
      'api::grant.grant',
      'manyToMany',
      'api::grant-use-case.grant-use-case'
    >;
    content: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::grant.grant',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::grant.grant',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::grant.grant',
      'oneToMany',
      'api::grant.grant'
    >;
    locale: StringAttribute;
  };
}

export interface ApiGrantCategoryGrantCategory extends CollectionTypeSchema {
  info: {
    singularName: 'grant-category';
    pluralName: 'grant-categories';
    displayName: 'Grant Category';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    color: StringAttribute &
      CustomField<'plugin::color-picker.color'> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    grants: RelationAttribute<
      'api::grant-category.grant-category',
      'manyToMany',
      'api::grant.grant'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::grant-category.grant-category',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::grant-category.grant-category',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::grant-category.grant-category',
      'oneToMany',
      'api::grant-category.grant-category'
    >;
    locale: StringAttribute;
  };
}

export interface ApiGrantUseCaseGrantUseCase extends CollectionTypeSchema {
  info: {
    singularName: 'grant-use-case';
    pluralName: 'grant-use-cases';
    displayName: 'Grant Use Case';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    name: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    color: StringAttribute &
      CustomField<'plugin::color-picker.color'> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    grants: RelationAttribute<
      'api::grant-use-case.grant-use-case',
      'manyToMany',
      'api::grant.grant'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::grant-use-case.grant-use-case',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::grant-use-case.grant-use-case',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::grant-use-case.grant-use-case',
      'oneToMany',
      'api::grant-use-case.grant-use-case'
    >;
    locale: StringAttribute;
  };
}

export interface ApiPostPost extends CollectionTypeSchema {
  info: {
    singularName: 'post';
    pluralName: 'posts';
    displayName: 'Post';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: StringAttribute;
    slug: UIDAttribute<'api::post.post', 'title'>;
    description: TextAttribute;
    cover: MediaAttribute;
    content: DynamicZoneAttribute<['shared.rich-text', 'shared.tweet']> &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    authors: RelationAttribute<
      'api::post.post',
      'manyToMany',
      'api::author.author'
    >;
    tags: RelationAttribute<'api::post.post', 'manyToMany', 'api::tag.tag'>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'api::post.post', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'api::post.post', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface ApiTagTag extends CollectionTypeSchema {
  info: {
    singularName: 'tag';
    pluralName: 'tags';
    displayName: 'Tag';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    name: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    color: StringAttribute &
      CustomField<'plugin::color-picker.color'> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    posts: RelationAttribute<'api::tag.tag', 'manyToMany', 'api::post.post'>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'api::tag.tag', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'api::tag.tag', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::tag.tag',
      'oneToMany',
      'api::tag.tag'
    >;
    locale: StringAttribute;
  };
}

export interface ApiTokenToken extends CollectionTypeSchema {
  info: {
    singularName: 'token';
    pluralName: 'tokens';
    displayName: 'Token';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: StringAttribute & RequiredAttribute;
    symbol: StringAttribute & RequiredAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::token.token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::token.token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface SharedCurrencyTokenValue extends ComponentSchema {
  info: {
    displayName: 'ValueCurrency';
    icon: 'money-bill';
    description: '';
  };
  attributes: {
    value: IntegerAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 0;
      }>;
    currency: RelationAttribute<
      'shared.currency-token-value',
      'oneToOne',
      'api::currency.currency'
    >;
  };
}

export interface SharedLinkUrl extends ComponentSchema {
  info: {
    displayName: 'LinkUrl';
    icon: 'link';
  };
  attributes: {
    label: StringAttribute & RequiredAttribute;
    href: StringAttribute & RequiredAttribute;
    target: EnumerationAttribute<['_blank']>;
  };
}

export interface SharedRichText extends ComponentSchema {
  info: {
    displayName: 'RichText';
    icon: 'text-height';
  };
  attributes: {
    markup: RichTextAttribute;
  };
}

export interface SharedSocials extends ComponentSchema {
  info: {
    displayName: 'Socials';
    icon: 'globe';
    description: '';
  };
  attributes: {
    twitter: StringAttribute;
    discord: StringAttribute;
    website: StringAttribute;
    telegram: StringAttribute;
  };
}

export interface SharedTweet extends ComponentSchema {
  info: {
    displayName: 'Tweet';
    icon: 'kiwi-bird';
  };
  attributes: {
    url: StringAttribute;
  };
}

export interface SharedValueToken extends ComponentSchema {
  info: {
    displayName: 'ValueToken';
    icon: 'coins';
  };
  attributes: {
    value: IntegerAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 0;
      }>;
    token: RelationAttribute<
      'shared.value-token',
      'oneToOne',
      'api::token.token'
    >;
  };
}

declare global {
  namespace Strapi {
    interface Schemas {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::author.author': ApiAuthorAuthor;
      'api::blockchain.blockchain': ApiBlockchainBlockchain;
      'api::currency.currency': ApiCurrencyCurrency;
      'api::grant.grant': ApiGrantGrant;
      'api::grant-category.grant-category': ApiGrantCategoryGrantCategory;
      'api::grant-use-case.grant-use-case': ApiGrantUseCaseGrantUseCase;
      'api::post.post': ApiPostPost;
      'api::tag.tag': ApiTagTag;
      'api::token.token': ApiTokenToken;
      'shared.currency-token-value': SharedCurrencyTokenValue;
      'shared.link-url': SharedLinkUrl;
      'shared.rich-text': SharedRichText;
      'shared.socials': SharedSocials;
      'shared.tweet': SharedTweet;
      'shared.value-token': SharedValueToken;
    }
  }
}
