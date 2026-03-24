import { supabase } from './supabase';

export const api = {
  signup: async (data: { email: string; password: string; name: string }) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: { data: { name: data.name } },
    });
    if (error) throw new Error(error.message);
  },

  getProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('supabase_id', userId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data;
  },

  upsertProfile: async (profileData: any) => {
    const { data, error } = await supabase
      .from('profiles')
      .upsert(
        { supabase_id: profileData.userId, name: profileData.name, email: profileData.email },
        { onConflict: 'supabase_id' }
      )
      .select()
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data;
  },

  getConfig: async (userId: string) => {
    const { data, error } = await supabase
      .from('study_configs')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!data) return null;
    return {
      courseType: data.course_type,
      branch: data.branch,
      year: data.year,
      semester: data.semester,
      subjects: data.subjects ?? [],
      studySettings: data.study_settings ?? {},
    };
  },

  upsertConfig: async (configData: any) => {
    const { data, error } = await supabase
      .from('study_configs')
      .upsert(
        {
          user_id: configData.userId,
          course_type: configData.courseType,
          branch: configData.branch,
          year: configData.year,
          semester: configData.semester,
          subjects: configData.subjects ?? [],
          study_settings: configData.studySettings ?? {},
        },
        { onConflict: 'user_id' }
      )
      .select()
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data;
  },

  getQuizResults: async (userId: string) => {
    const { data, error } = await supabase
      .from('quiz_results')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []).map((r: any) => ({
      ...r,
      createdAt: r.created_at,
    }));
  },

  saveQuizResult: async (resultData: any) => {
    const { data, error } = await supabase
      .from('quiz_results')
      .insert({
        user_id: resultData.userId,
        score: resultData.score,
        total: resultData.total,
        percentage: resultData.percentage,
        subject: resultData.subject,
      })
      .select()
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data;
  },

  getSessions: async (userId: string) => {
    const { data, error } = await supabase
      .from('study_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('session_date', { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []).map((s: any) => ({
      ...s,
      subjectName: s.subject_name,
      subjectCode: s.subject_code,
      sessionDate: s.session_date,
      createdAt: s.created_at,
    }));
  },

  saveSession: async (sessionData: any) => {
    const { data, error } = await supabase
      .from('study_sessions')
      .insert({
        user_id: sessionData.userId,
        subject_name: sessionData.subjectName,
        subject_code: sessionData.subjectCode,
        hours: sessionData.hours,
        session_date: sessionData.sessionDate,
        completed: sessionData.completed,
        topic: sessionData.topic,
      })
      .select()
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data;
  },
};
