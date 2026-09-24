import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

const inputClasses =
    'mt-1 block w-full rounded-lg border-input bg-background text-foreground shadow-sm focus:border-foreground focus:ring-ring';

export default function Settings({ groups }) {
    const initial = {};
    Object.values(groups).forEach((items) =>
        items.forEach((s) => {
            initial[s.id] = s.value ?? '';
        }),
    );

    const { data, setData, put, processing, isDirty } = useForm({
        settings: initial,
    });

    const submit = (e) => {
        e.preventDefault();
        put('/admin/settings', { preserveScroll: true });
    };

    const setSetting = (id, value) =>
        setData('settings', { ...data.settings, [id]: value });

    return (
        <AdminLayout
            title="Site settings"
            description="Contact details and links used across the site."
            actions={
                <button
                    form="settings-form"
                    type="submit"
                    disabled={processing || !isDirty}
                    className="flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-40"
                >
                    {processing && (
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                    )}
                    {isDirty ? 'Save changes' : 'Saved'}
                </button>
            }
        >
            <Head title="Settings" />

            <form
                id="settings-form"
                onSubmit={submit}
                className="max-w-3xl space-y-6"
            >
                {Object.entries(groups).map(([group, items]) => (
                    <div
                        key={group}
                        className="rounded-2xl border border-border bg-card p-6 shadow-premium-sm"
                    >
                        <h2 className="mb-4 font-semibold capitalize text-foreground">
                            {group}
                        </h2>

                        <div className="space-y-4">
                            {items.map((setting) => (
                                <div key={setting.id}>
                                    <label
                                        htmlFor={`setting-${setting.id}`}
                                        className="block text-sm font-medium text-foreground"
                                    >
                                        {setting.label}
                                    </label>

                                    {setting.type === 'textarea' ? (
                                        <textarea
                                            id={`setting-${setting.id}`}
                                            rows={2}
                                            value={data.settings[setting.id] ?? ''}
                                            onChange={(e) =>
                                                setSetting(
                                                    setting.id,
                                                    e.target.value,
                                                )
                                            }
                                            className={inputClasses}
                                        />
                                    ) : (
                                        <input
                                            id={`setting-${setting.id}`}
                                            type="text"
                                            value={data.settings[setting.id] ?? ''}
                                            onChange={(e) =>
                                                setSetting(
                                                    setting.id,
                                                    e.target.value,
                                                )
                                            }
                                            className={inputClasses}
                                        />
                                    )}

                                    <p className="mt-1 text-xs text-muted-foreground">
                                        <code>{setting.key}</code>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </form>
        </AdminLayout>
    );
}
