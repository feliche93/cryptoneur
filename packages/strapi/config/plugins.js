module.exports = ({ env }) => ({
    seo: {
        enabled: true,
    },
    upload: {
        config: {
            provider: 'aws-s3',
            providerOptions: {
                accessKeyId: env('AWS_ACCESS_KEY_ID'),
                secretAccessKey: env('AWS_ACCESS_SECRET'),
                region: env('AWS_REGION'),
                params: {
                    Bucket: env('AWS_BUCKET'),
                },
            },
        },
    },
    ckeditor: {
        enabled: true,
        config: {
            editor: {
                toolbar: {
                    items: [
                        'heading',
                        '|',
                        'bold',
                        'italic',
                        'underline',
                        'strikethrough',
                        'removeFormat',
                        '|',
                        'link',
                        '|',
                        'bulletedList',
                        'todoList',
                        'numberedList',
                        '|',
                        'blockQuote',
                        'code',
                        'codeBlock',
                        '|',
                        'sourceEditing',
                        '|',
                        "fullScreen",
                        '|',
                        'undo',
                        'redo'
                    ]
                },
            }
        }
    },
    'config-sync': {
        enabled: true,
        config: {
            syncDir: "config/sync/",
            minify: false,
            soft: false,
            importOnBootstrap: false,
            customTypes: [],
            excludedTypes: [],
            excludedConfig: [
                "core-store.plugin_users-permissions_grant"
            ],
        },
    },
    // ...
});